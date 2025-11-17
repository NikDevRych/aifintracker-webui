import { useState } from "react";
import type { LoginFormValues } from "../model/schema";
import { setToken, setRefreshToken } from "../../auth/lib/auth";
import { loginRequest } from "../api";
import type { AuthResponse } from "../../../entities/token/types";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const res: AuthResponse = await loginRequest(data);
      // normalize keys: API returns { Token, RefreshToken } or { token, refreshToken }
      const token = (res as any).token ?? (res as any).Token;
      const refresh = (res as any).refreshToken ?? (res as any).RefreshToken;
      if (token) setToken(token);
      if (refresh) setRefreshToken(String(refresh));

      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading } as const;
}
