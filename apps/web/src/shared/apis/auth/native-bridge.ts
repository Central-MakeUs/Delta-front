export type NativeKakaoLoginResult =
  | { status: "success"; accessToken: string }
  | { status: "cancelled" }
  | { status: "error"; message: string };

export type NativeAppleLoginResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "error"; message: string };

export type OAuthStartBridgeMessage = {
  type: "OAUTH_START";
  url: string;
  callbackPrefix: string;
};

export type OpenExternalUrlBridgeMessage = {
  type: "OPEN_EXTERNAL_URL";
  url: string;
};

export type TokenUpdateBridgeMessage = {
  type: "TOKEN_UPDATE";
  accessToken: string | null;
  refreshToken: string | null;
};

export type TokenClearBridgeMessage = {
  type: "TOKEN_CLEAR";
};

type WebViewBridgeMessage =
  | OAuthStartBridgeMessage
  | OpenExternalUrlBridgeMessage
  | TokenUpdateBridgeMessage
  | TokenClearBridgeMessage;

function postWebViewMessage(payload: WebViewBridgeMessage): void {
  if (typeof window === "undefined") return;
  window.ReactNativeWebView?.postMessage(JSON.stringify(payload));
}

export function postOAuthMessage(url: string, callbackPrefix: string): void {
  postWebViewMessage({
    type: "OAUTH_START",
    url,
    callbackPrefix,
  });
}

export function postOpenExternalUrlMessage(url: string): void {
  postWebViewMessage({
    type: "OPEN_EXTERNAL_URL",
    url,
  });
}

export function postTokenUpdate(
  accessToken: string | null,
  refreshToken: string | null
): void {
  postWebViewMessage({
    type: "TOKEN_UPDATE",
    accessToken,
    refreshToken,
  });
}

export function postTokenClear(): void {
  postWebViewMessage({ type: "TOKEN_CLEAR" });
}

export function postNativeKakaoLogin(): void {
  if (typeof window === "undefined") return;
  window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "NATIVE_KAKAO_LOGIN" }));
}

export function postNativeAppleLogin(): void {
  if (typeof window === "undefined") return;
  window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "NATIVE_APPLE_LOGIN" }));
}

export function isReactNativeWebView(): boolean {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
}
