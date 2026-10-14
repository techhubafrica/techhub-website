/* Renders the live events hub (events.techhubafrica.org) on our own origin.
 * Loaded inside an iframe at /events-hub/<path>; every request the hub makes
 * goes through the events-proxy backend function so nothing leaves the site. */

export const HUB_PREFIX = "/events-hub";
const ORIGIN = "https://events.techhubafrica.org";
const PROXY = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/events-proxy`;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type ProxyReply = { status: number; contentType: string; location: string; bodyB64: string; cookie: string };

const decode = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const encode = (buf: ArrayBuffer) => {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};

async function proxy(path: string, init: { method?: string; contentType?: string; body?: ArrayBuffer; accept?: string } = {}) {
  const res = await fetch(PROXY, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: KEY, Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      path,
      method: init.method || "GET",
      contentType: init.contentType,
      accept: init.accept,
      bodyB64: init.body && init.body.byteLength ? encode(init.body) : undefined,
      cookie: sessionStorage.getItem("hub-cookie") || "",
    }),
  });
  if (!res.ok) throw new Error(`Events hub unavailable (${res.status}): ${await res.text()}`);
  const data = (await res.json()) as ProxyReply;
  if (data.cookie) sessionStorage.setItem("hub-cookie", data.cookie);
  return data;
}


const toLocal = (u: URL) => HUB_PREFIX + u.pathname + u.search + u.hash;

function installShim() {
  const w = window as Window & typeof globalThis;
  const realFetch = w.fetch.bind(w);
  const currentHubPath = () => location.pathname.slice(HUB_PREFIX.length) || "/";

  w.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = new Request(input instanceof Request ? input : new URL(String(input), document.baseURI).href, init);
    const u = new URL(req.url);
    if (u.origin !== ORIGIN) return realFetch(input, init);
    const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();
    const r = await proxy(u.pathname + u.search, {
      method: req.method,
      contentType: req.headers.get("content-type") || undefined,
      accept: req.headers.get("accept") || undefined,
      body,
    });
    return new Response(r.status === 204 ? null : decode(r.bodyB64), {
      status: r.status < 200 ? 200 : r.status,
      headers: { "Content-Type": r.contentType },
    });
  };

  const go = (u: URL) => {
    if (u.pathname === currentHubPath() && u.hash && !u.search) {
      location.hash = u.hash;
      return;
    }
    location.href = location.origin + toLocal(u);
  };

  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const u = new URL(a.getAttribute("href")!, document.baseURI);
    if (u.origin === ORIGIN) {
      e.preventDefault();
      go(u);
    } else if (u.hostname === "techhubafrica.org" || u.hostname === "www.techhubafrica.org") {
      e.preventDefault(); // never send visitors to the old main website
    }
  }, true);

  document.addEventListener("submit", async (e) => {
    const form = e.target as HTMLFormElement;
    const u = new URL(form.getAttribute("action") || location.href.replace(location.origin + HUB_PREFIX, ORIGIN), document.baseURI);
    if (u.origin !== ORIGIN || e.defaultPrevented) return;
    e.preventDefault();
    const method = (form.method || "GET").toUpperCase();
    if (method === "GET") {
      u.search = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      return go(u);
    }
    const req = new Request(u.href, { method, body: new FormData(form) });
    const r = await proxy(u.pathname + u.search, { method, contentType: req.headers.get("content-type") || undefined, body: await req.arrayBuffer() });
    if (r.location) return go(new URL(r.location, ORIGIN));
    render(new TextDecoder().decode(decode(r.bodyB64)), u);
  }, true);

  // Keep the parent frame sized to the content and in step with navigation.
  const post = () => parent.postMessage({ type: "hub-height", height: document.documentElement.scrollHeight }, location.origin);
  new ResizeObserver(post).observe(document.documentElement);
  addEventListener("load", post);
  parent.postMessage({ type: "hub-nav", path: currentHubPath() }, location.origin);
}

function rewrite(html: string) {
  return html
    // Remove every "Main Website" link to the old site.
    .replace(/<a[^>]*href="https?:\/\/(www\.)?techhubafrica\.org\/?"[^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<head([^>]*)>/i, `<head$1><base href="${ORIGIN}/"><script>window.__hubShim&&window.__hubShim()</script>`);
}

function render(html: string, _u?: URL) {
  (window as unknown as { __hubShim: () => void }).__hubShim = installShim;
  document.open();
  document.write(rewrite(html));
  document.close();
}

export async function bootHubFrame() {
  const path = location.pathname.slice(HUB_PREFIX.length) || "/";
  document.body.innerHTML = '<p style="font:15px system-ui;padding:3rem;text-align:center;color:#555">Loading events…</p>';
  try {
    let r = await proxy(path + location.search, { accept: "text/html" });
    for (let i = 0; i < 4 && r.status >= 300 && r.status < 400 && r.location; i++) {
      const next = new URL(r.location, ORIGIN);
      history.replaceState(null, "", toLocal(next));
      r = await proxy(next.pathname + next.search, { accept: "text/html" });
    }
    render(new TextDecoder().decode(decode(r.bodyB64)));
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<p style="font:15px system-ui;padding:3rem;text-align:center;color:#555">Events are temporarily unavailable. Please try again shortly.</p>';
  }
}


