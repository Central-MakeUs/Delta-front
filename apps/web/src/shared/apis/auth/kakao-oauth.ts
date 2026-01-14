import { ROUTES } from "@/shared/constants/routes";

const STATE_KEY = "kakao:oauth-state";

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

const buildRedirectUriFromOrigin = () => {
  return `${getOrigin()}${ROUTES.AUTH.KAKAO_CALLBACK}`;
};

export const kakaoOAuth = {
  buildRedirectUri: () => buildRedirectUriFromOrigin(),

  saveState: (state: string) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(STATE_KEY, state);
  },

  consumeState: (incomingState: string | null) => {
    if (typeof window === "undefined") return false;
    if (!incomingState) return false;

    const saved = window.sessionStorage.getItem(STATE_KEY);
    window.sessionStorage.removeItem(STATE_KEY);

    return !!saved && saved === incomingState;
  },

  buildAuthorizeUrl: () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "";
    const scopes = process.env.NEXT_PUBLIC_KAKAO_SCOPES ?? "";
    const redirectUri = buildRedirectUriFromOrigin();
    const state = createState();

    kakaoOAuth.saveState(state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state,
    });

    if (scopes.trim().length) params.set("scope", scopes);

    return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  },
};
