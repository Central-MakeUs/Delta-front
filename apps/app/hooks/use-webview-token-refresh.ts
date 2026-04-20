import { useEffect, useRef } from "react";
import { AppState, type AppStateStatus } from "react-native";
import type { WebView } from "react-native-webview";

const CLEAR_EXPIRED_TOKEN_JS = `
(function() {
  try {
    var access = localStorage.getItem('delta:access-token');
    if (!access) return;
    var parts = access.split('.');
    if (parts.length !== 3) return;
    var b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    var pad = b64.length % 4;
    if (pad) b64 += '===='.slice(pad);
    var payload = JSON.parse(atob(b64));
    if (!payload.exp || payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem('delta:access-token');
      window.dispatchEvent(new Event('app:auth-session-changed'));
    }
  } catch(e) {}
})();
true;
`;

export function useWebViewTokenRefresh(
  webViewRef: React.RefObject<WebView | null>
) {
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background") {
        backgroundedAt.current = Date.now();
        return;
      }
      if (nextState === "active" && backgroundedAt.current !== null) {
        backgroundedAt.current = null;
        webViewRef.current?.injectJavaScript(CLEAR_EXPIRED_TOKEN_JS);
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [webViewRef]);
}
