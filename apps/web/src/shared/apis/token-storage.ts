type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

const ACCESS_KEY = "delta:access-token";
const REFRESH_KEY = "delta:refresh-token";

const safeGet = (k: string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(k);
};

const safeSet = (k: string, v: string | null) => {
  if (typeof window === "undefined") return;
  if (!v) window.localStorage.removeItem(k);
  else window.localStorage.setItem(k, v);
};

export const tokenStorage = {
  getTokens: (): Tokens => ({
    accessToken: safeGet(ACCESS_KEY),
    refreshToken: safeGet(REFRESH_KEY),
  }),

  setTokens: (tokens: Partial<Tokens>) => {
    const cur = tokenStorage.getTokens();
    const next: Tokens = {
      accessToken: tokens.accessToken ?? cur.accessToken,
      refreshToken: tokens.refreshToken ?? cur.refreshToken,
    };

    safeSet(ACCESS_KEY, next.accessToken);
    safeSet(REFRESH_KEY, next.refreshToken);
  },

  clear: () => {
    safeSet(ACCESS_KEY, null);
    safeSet(REFRESH_KEY, null);
  },
};
