import { refreshRequest } from "../api";
import type { AuthResponse } from "../../../entities/token/types";

const TOKEN_KEY = "aifin.token";
const REFRESH_KEY = "aifin.refresh";

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore localStorage errors in SSR or private modes
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setRefreshToken(token: string) {
  try {
    localStorage.setItem(REFRESH_KEY, token);
  } catch {
    // ignore
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* empty */
  }
}

function tryParseJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  const payload = tryParseJwtPayload(token);
  if (payload && typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000);
    // if token is valid for at least 10 more seconds, consider authenticated
    if (payload.exp > now + 10) return true;

    // try refresh if refresh token exists
    const refresh = getRefreshToken();
    if (!refresh) {
      clearToken();
      return false;
    }

    try {
      const res: AuthResponse = await refreshRequest(refresh);
      if (!res) {
        clearToken();
        return false;
      }

      const newToken = (res as any).token ?? (res as any).Token;
      const newRefresh = (res as any).refreshToken ?? (res as any).RefreshToken;
      if (newToken) setToken(newToken);
      if (newRefresh) setRefreshToken(String(newRefresh));

      return Boolean(getToken());
    } catch {
      clearToken();
      return false;
    }
  }

  // If token is not a JWT, assume it exists and is valid
  return true;
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
