import { useState } from "react";
import type { LoginFormValues } from "../model/schema";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: LoginFormValues) {
    setIsLoading(true);
    try {
      // Replace with real API call. This is a stub for local dev/testing.
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Basic simulated validation — remove when wiring real backend
      if (!data.email.includes("@") || data.password.length < 6) {
        throw new Error("Invalid credentials");
      }

      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading } as const;
}
