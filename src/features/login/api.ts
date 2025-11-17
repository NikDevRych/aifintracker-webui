import type { LoginFormValues } from "./model/schema";
import type { AuthResponse } from "../../entities/token/types";

const BASE = "http://localhost:5062";

export async function loginRequest(
  data: LoginFormValues,
): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Login failed: ${res.status}`);
  }

  return (await res.json()) as AuthResponse;
}
