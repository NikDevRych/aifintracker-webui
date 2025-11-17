import type { AuthResponse } from "../../entities/token/types";

const BASE = "http://localhost:5062";

export async function refreshRequest(
  refreshToken: string,
): Promise<AuthResponse> {
  const url = new URL(`${BASE}/api/auth/refresh`);
  url.searchParams.set("refreshToken", refreshToken);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Refresh failed: ${res.status}`);
  }

  return (await res.json()) as AuthResponse;
}
