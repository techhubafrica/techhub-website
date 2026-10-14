// Pass-through for https://events.techhubafrica.org so the corporate site can
// show the live events hub in-app. Only that host is ever contacted.
const ORIGIN = "https://events.techhubafrica.org";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const toB64 = (buf: ArrayBuffer) => {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
const fromB64 = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { path = "/", method = "GET", contentType, bodyB64, cookie, accept } = await req.json();
    if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) {
      return new Response(JSON.stringify({ error: "Invalid path" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const m = String(method).toUpperCase();
    if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(m)) {
      return new Response(JSON.stringify({ error: "Invalid method" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (TechHubAfrica in-app events)",
      Accept: accept || "*/*",
      Origin: ORIGIN,
      Referer: ORIGIN + "/",
    };
    if (cookie) headers.Cookie = String(cookie);
    if (contentType) headers["Content-Type"] = String(contentType);

    const upstream = await fetch(ORIGIN + path, {
      method: m,
      headers,
      body: m === "GET" || !bodyB64 ? undefined : fromB64(bodyB64),
      redirect: "manual",
    });

    // Merge any new cookies into the jar the browser holds for us.
    const jar = new Map<string, string>();
    String(cookie || "").split(/;\s*/).filter(Boolean).forEach((p) => {
      const i = p.indexOf("=");
      if (i > 0) jar.set(p.slice(0, i), p.slice(i + 1));
    });
    for (const sc of upstream.headers.getSetCookie?.() ?? []) {
      const first = sc.split(";")[0];
      const i = first.indexOf("=");
      if (i > 0) jar.set(first.slice(0, i).trim(), first.slice(i + 1));
    }

    const buf = await upstream.arrayBuffer();
    return new Response(
      JSON.stringify({
        status: upstream.status,
        contentType: upstream.headers.get("content-type") || "",
        location: upstream.headers.get("location") || "",
        bodyB64: toB64(buf),
        cookie: [...jar].map(([k, v]) => `${k}=${v}`).join("; "),
      }),
      { headers: { ...cors, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("events-proxy failed:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
