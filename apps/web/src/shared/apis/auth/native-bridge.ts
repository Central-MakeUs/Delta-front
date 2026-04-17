/**
 * 웹 → 네이티브(React Native WebView) OAuth 브릿지.
 * 앱 `webview.tsx`의 `OAUTH_START` 처리와 메시지 shape을 반드시 맞출 것.
 */
export type OAuthStartBridgeMessage = {
  type: "OAUTH_START";
  url: string;
  callbackPrefix: string;
};

export function postOAuthMessage(url: string, callbackPrefix: string): void {
  if (typeof window === "undefined") return;
  const payload: OAuthStartBridgeMessage = {
    type: "OAUTH_START",
    url,
    callbackPrefix,
  };
  window.ReactNativeWebView?.postMessage(JSON.stringify(payload));
}

export function isReactNativeWebView(): boolean {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
}
