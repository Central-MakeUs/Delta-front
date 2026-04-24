import { ROUTES } from "@/shared/constants/routes";

export const APPLE_CALLBACK_PATH = ROUTES.AUTH.APPLE_CALLBACK;

const STATE_KEY = "apple:oauth-state";
const SPLASH_SUPPRESS_ONCE_KEY = "splash:suppress-once";

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
    devWarn("[appleOAuth] sessionStorage.getItem failed", e);
    return null;
  }
};

const safeSessionSet = (key: string, value: string) => {
  if (typeof window === "undefined") return false;
  try {
    window.sessionStorage.setItem(key, value);
    return true;
  } catch (e) {
    devWarn("[appleOAuth] sessionStorage.setItem failed", e);
    return false;
  }
};

const safeSessionRemove = (key: string) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch (e) {
    devWarn("[appleOAuth] sessionStorage.removeItem failed", e);
  }
};

export const appleOAuth = {
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
    const clientId = (process.env.NEXT_PUBLIC_APPLE_CLIENT_ID ?? "").trim();
    const redirectUri = (
      process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI?.trim() ||
      (typeof window !== "undefined"
        ? `${window.location.origin}${ROUTES.AUTH.APPLE_CALLBACK}`
        : "")
    ).trim();

    safeSessionSet(SPLASH_SUPPRESS_ONCE_KEY, "1");

    if (!clientId || !redirectUri) {
      devWarn(
        "[appleOAuth] NEXT_PUBLIC_APPLE_CLIENT_ID 또는 NEXT_PUBLIC_APPLE_REDIRECT_URI가 없습니다. " +
          "Apple Developer Console의 Return URL과 동일한 redirect_uri를 설정하세요."
      );
      return "";
    }

    const state = createState();
    const saved = safeSessionSet(STATE_KEY, state);
    if (!saved) {
      devWarn(
        "[appleOAuth] Failed to save state, CSRF protection may not work"
      );
    }

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "name email",
      response_mode: "form_post",
      state,
    });

    return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  },
};
