const TOKEN_KEY = "aifin.token";

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

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* empty */
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
