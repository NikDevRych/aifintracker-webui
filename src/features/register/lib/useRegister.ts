import { useState } from "react";
import type { RegisterFormValues } from "../model/schema";
import { setToken } from "../../auth/lib/auth";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function register(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // Replace with a real API call to register the user.
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simple stub: accept anything that looks valid.
      if (!data.email.includes("@") || data.password.length < 6) {
        throw new Error("Invalid registration data");
      }

      // set a fake token for demo purposes; replace with real token from API
      setToken("demo-token");
      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading } as const;
}
