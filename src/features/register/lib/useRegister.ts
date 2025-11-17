import { useState } from "react";
import type { RegisterFormValues } from "../model/schema";
import { setToken, setRefreshToken } from "../../auth/lib/auth";
import { registerRequest } from "../api/api";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function register(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const res = await registerRequest(data);
      if (res.token) setToken(res.token);
      if (res.refreshToken) setRefreshToken(String(res.refreshToken));

      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading } as const;
}
