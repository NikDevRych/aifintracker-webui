import { useState } from "react";
import type { RegisterFormValues } from "../model/schema";
import { setToken, setRefreshToken } from "../../auth/lib/auth";
import { registerRequest } from "../api";
import type { AuthResponse } from "../../../entities/token/types";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function register(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const res: AuthResponse = await registerRequest(data);
      const token = (res as any).token ?? (res as any).Token;
      const refresh = (res as any).refreshToken ?? (res as any).RefreshToken;
      if (token) setToken(token);
      if (refresh) setRefreshToken(String(refresh));

      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading } as const;
}
