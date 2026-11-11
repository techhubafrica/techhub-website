const API_BASE = "https://api.techhubafrica.org/v1/website";

export interface WebsiteOpening {
  id: number;
  slug: string;
  title: string;
  type: "job" | "internship";
  department: string;
  location: string;
  employment_type: string;
  summary: string;
  description?: string;
  requirements: string[];
  closes_at: string | null;
}

type ApiEnvelope<T> = { data: T; message?: string };

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  let body: any;
  try {
    body = await response.json();
  } catch {
    throw new Error("The application service returned an unreadable response. Please try again.");
  }

  if (!response.ok) {
    const validation = body?.errors && Object.values(body.errors).flat().join(" ");
    throw new Error(validation || body?.message || `Request failed (${response.status}). Please try again.`);
  }

  return body as ApiEnvelope<T>;
}

export async function getWebsiteOpenings(): Promise<WebsiteOpening[]> {
  const response = await fetch(`${API_BASE}/openings`, {
    headers: { Accept: "application/json" },
  });
  const result = await parseResponse<WebsiteOpening[]>(response);
  return result.data;
}

export async function submitWebsiteForm<T = { reference?: string }>(
  endpoint:
    | "career-applications"
    | "mentorship-applications"
    | "partnership-inquiries"
    | "service-inquiries"
    | "speaker-proposals",
  payload: FormData | Record<string, string | boolean>,
): Promise<ApiEnvelope<T>> {
  const isMultipart = payload instanceof FormData;
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: isMultipart
      ? { Accept: "application/json" }
      : { Accept: "application/json", "Content-Type": "application/json" },
    body: isMultipart ? payload : JSON.stringify(payload),
  });
  return parseResponse<T>(response);
}

export function websiteApiError(error: unknown): string {
  if (error instanceof TypeError) {
    return "We couldn’t reach the application service. Check your connection and try again.";
  }
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
