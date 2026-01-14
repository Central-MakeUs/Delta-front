export const AUTH_LOGOUT_EVENT = "app:auth-logout" as const;

export const emitAuthLogout = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
};
