import { emitAuthSessionChanged } from "@/shared/apis/auth/auth-events";
import { postTokenUpdate, postTokenClear } from "@/shared/apis/auth/native-bridge";

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

const ACCESS_KEY = "delta:access-token";
const REFRESH_KEY = "delta:refresh-token";

export const TOKEN_STORAGE_KEYS = {
  access: ACCESS_KEY,
  refresh: REFRESH_KEY,
} as const;

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
    emitAuthSessionChanged();
    postTokenUpdate(next.accessToken, next.refreshToken);
  },

  clear: () => {
    safeSet(ACCESS_KEY, null);
    safeSet(REFRESH_KEY, null);
    emitAuthSessionChanged();
    postTokenClear();
  },
};
