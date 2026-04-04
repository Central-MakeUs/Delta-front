import { ROUTES } from "@/shared/constants/routes";

const STATE_KEY = "google:oauth-state";
const SPLASH_SUPPRESS_ONCE_KEY = "splash:suppress-once";

const getOrigin = () => {
  if (typeof window === "undefined") return "";
  return window.location.origin;
};

const createState = () => {
  if (typeof window === "undefined") return "ssr";

  if (window.crypto?.getRandomValues) {
    const arr = new Uint32Array(4);
    window.crypto.getRandomValues(arr);
    return Array.from(arr)
      .map((n) => n.toString(16))
      .join("");
  }

  return Math.random().toString(16).slice(2);
};

const devWarn = (message: string, e?: unknown) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, e);
  }
};

const safeSessionGet = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    devWarn("[googleOAuth] sessionStorage.getItem failed", e);
    return null;
  }
};

const safeSessionSet = (key: string, value: string) => {
  if (typeof window === "undefined") return false;
  try {
    window.sessionStorage.setItem(key, value);
    return true;
  } catch (e) {
    devWarn("[googleOAuth] sessionStorage.setItem failed", e);
    return false;
  }
};

const safeSessionRemove = (key: string) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch (e) {
    devWarn("[googleOAuth] sessionStorage.removeItem failed", e);
  }
};

const buildRedirectUri = () =>
  `${getOrigin()}${ROUTES.AUTH.GOOGLE_CALLBACK}`;

export const googleOAuth = {
  buildRedirectUri: () => buildRedirectUri(),

  saveState: (state: string) => {
    safeSessionSet(STATE_KEY, state);
  },

  consumeState: (incomingState: string | null) => {
    if (typeof window === "undefined") return false;
    if (!incomingState) return false;

    const saved = safeSessionGet(STATE_KEY);
    safeSessionRemove(STATE_KEY);

    return !!saved && saved === incomingState;
  },

  buildAuthorizeUrl: () => {
    const clientId = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "").trim();
    const redirectUri = buildRedirectUri();

    safeSessionSet(SPLASH_SUPPRESS_ONCE_KEY, "1");

    if (!clientId) {
      devWarn("[googleOAuth] NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");
    }

    const state = createState();
    const saved = safeSessionSet(STATE_KEY, state);
    if (!saved) {
      devWarn(
        "[googleOAuth] Failed to save state, CSRF protection may not work"
      );
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },
};
