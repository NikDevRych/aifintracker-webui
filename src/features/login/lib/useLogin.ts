import { useState } from "react";
import type { LoginFormValues } from "../model/schema";
import { setToken, setRefreshToken } from "../../auth/lib/auth";
import { loginRequest } from "../api/api";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const res = await loginRequest(data);
      if (res.token) setToken(res.token);
      if (res.refreshToken) setRefreshToken(String(res.refreshToken));

      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading } as const;
}
