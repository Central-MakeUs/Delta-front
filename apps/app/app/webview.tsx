import React, { useCallback, useRef } from "react";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);

  const handleMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as { type: string; payload?: unknown };

      if (data.type === "NAVIGATION_BACK") {
        webViewRef.current?.goBack();
      }
    } catch {}
  }, []);

  const handleShouldStart = useCallback((req: any) => {
    const url = String(req?.url ?? "");
    const isHttp = url.startsWith("http://") || url.startsWith("https://");
    if (isHttp) return true;

    if (
      url.startsWith("kakao") ||
      url.startsWith("intent:") ||
      url.startsWith("market:") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    ) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    return true;
  }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEB_BASE_URL}/` }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      setSupportMultipleWindows={false}
      originWhitelist={[
        "https://semo-xi.vercel.app",
        "https://*.vercel.app",
        "https://kauth.kakao.com",
        "https://*.kakao.com",
        "https://appleid.apple.com",
      ]}
      onShouldStartLoadWithRequest={handleShouldStart}
      onMessage={handleMessage}
    />
  );
};

export default WebViewScreen;
