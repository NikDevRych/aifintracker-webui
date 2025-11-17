import type { RegisterFormValues } from "./model/schema";
import type { AuthResponse } from "../../entities/token/types";
import { loginRequest } from "../login/api";

const BASE = "http://localhost:5062";

export async function registerRequest(
  data: RegisterFormValues,
): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  console.log(res);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Register failed: ${res.status}`);
  }

  // The register endpoint currently returns 201 Created without tokens.
  // If we get 201, immediately call login to obtain the AuthResponse.
  if (res.status === 201) {
    // Re-use the login request to obtain tokens using provided credentials
    return await loginRequest({ email: data.email, password: data.password });
  }

  // Otherwise assume the response contains the AuthResponse body
  return (await res.json()) as AuthResponse;
}
