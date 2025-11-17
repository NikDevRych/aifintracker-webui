import type { RegisterFormValues } from "../model/schema";
import type { AuthResponse } from "../../../entities/token/types";
import { loginRequest } from "../../login/api/api";

const BASE = "http://localhost:5062";

export async function registerRequest(
  data: RegisterFormValues,
): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Register failed: ${res.status}`);
  }

  if (res.status === 204) {
    return await loginRequest({ email: data.email, password: data.password });
  }

  throw new Error(`Register failed: ${res.status}, not have token`);
}
