export const AUTH_LOGOUT_EVENT = "app:auth-logout" as const;
export const AUTH_FRESH_KEY = "app:auth-fresh" as const;
export const AUTH_FRESH_GRACE_MS = 3000;

export const emitAuthLogout = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
};

export const setAuthFresh = () => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(AUTH_FRESH_KEY, Date.now().toString());
  } catch {
    // ignore
  }
};

export const consumeAuthFresh = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(AUTH_FRESH_KEY);
    window.sessionStorage.removeItem(AUTH_FRESH_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    return Date.now() - ts <= AUTH_FRESH_GRACE_MS;
  } catch {
    return false;
  }
};

export const isInAuthFlow = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.location.pathname.startsWith("/oauth");
};
