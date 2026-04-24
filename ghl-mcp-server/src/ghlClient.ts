import fetch, { RequestInit } from "node-fetch";

const API_BASE = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
const API_VERSION = process.env.GHL_API_VERSION ?? "2021-07-28";
const API_KEY = process.env.GHL_API_KEY;
const DEFAULT_LOCATION_ID = process.env.DEFAULT_LOCATION_ID;

function baseHeaders(locationId?: string) {
  if (!API_KEY) throw new Error("GHL_API_KEY missing");
  const h: Record<string, string> = {
    Authorization: `Bearer ${API_KEY}`,
    Version: API_VERSION,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const loc = locationId ?? DEFAULT_LOCATION_ID;
  if (loc) h["LocationId"] = loc;
  return h;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function ghlFetch(
  path: string,
  opts: { method?: string; body?: any; locationId?: string; query?: Record<string, string | number | undefined> } = {}
) {
  const qs = opts.query
    ? "?" +
      Object.entries(opts.query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&")
    : "";
  const url = `${API_BASE}${path}${qs}`;

  const init: RequestInit = {
    method: opts.method ?? "GET",
    headers: baseHeaders(opts.locationId),
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  };

  // Basic 429/backoff retry
  const maxAttempts = 4;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, init);
    if (res.status === 429 && attempt < maxAttempts) {
      const retryAfter = Number(res.headers.get("retry-after")) || 1 * attempt;
      await sleep(retryAfter * 1000);
      continue;
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GHL ${res.status} ${res.statusText}: ${text}`);
    }
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return res.json();
    }
    return await res.text();
  }
  throw new Error("Failed after retries");
}
