/**
 * 웹 → 네이티브(React Native WebView) 브릿지.
 * 앱 `webview.tsx`의 메시지 처리와 shape을 반드시 맞출 것.
 */
export type OAuthStartBridgeMessage = {
  type: "OAUTH_START";
  url: string;
  callbackPrefix: string;
};

export type TokenUpdateBridgeMessage = {
  type: "TOKEN_UPDATE";
  accessToken: string | null;
  refreshToken: string | null;
};

export type TokenClearBridgeMessage = {
  type: "TOKEN_CLEAR";
};

function postMessage(payload: object): void {
  if (typeof window === "undefined") return;
  window.ReactNativeWebView?.postMessage(JSON.stringify(payload));
}

export function postOAuthMessage(url: string, callbackPrefix: string): void {
  postMessage({ type: "OAUTH_START", url, callbackPrefix } satisfies OAuthStartBridgeMessage);
}

export function postTokenUpdate(
  accessToken: string | null,
  refreshToken: string | null
): void {
  postMessage({ type: "TOKEN_UPDATE", accessToken, refreshToken } satisfies TokenUpdateBridgeMessage);
}

export function postTokenClear(): void {
  postMessage({ type: "TOKEN_CLEAR" } satisfies TokenClearBridgeMessage);
}

export function isReactNativeWebView(): boolean {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
}
