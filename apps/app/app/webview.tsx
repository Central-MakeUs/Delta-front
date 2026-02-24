import React, { useCallback, useRef } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);

  const isAllowedAuthUrl = useCallback((url: string) => {
    try {
      const u = new URL(url);
      const host = u.hostname;

      return (
        host === "semo-xi.vercel.app" ||
        host.endsWith(".vercel.app") ||
        host === "kauth.kakao.com" ||
        host.endsWith(".kakao.com") ||
        host === "appleid.apple.com" ||
        host.endsWith(".apple.com")
      );
    } catch {
      return false;
    }
  }, []);

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

    if (url.startsWith("kakao")) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    if (url.startsWith("intent:") || url.startsWith("market:")) {
      if (Platform.OS === "android") {
        Linking.openURL(url).catch(() => {});
      }
      return false;
    }

    Linking.openURL(url).catch(() => {});
    return false;
  }, []);

  const handleOpenWindow = useCallback(
    (e: any) => {
      const targetUrl = String(e?.nativeEvent?.targetUrl ?? "");
      if (!targetUrl) return;

      const isHttp = targetUrl.startsWith("http://") || targetUrl.startsWith("https://");

      if (isHttp && isAllowedAuthUrl(targetUrl)) {
        webViewRef.current?.injectJavaScript(
          `window.location.href = ${JSON.stringify(targetUrl)}; true;`,
        );
        return;
      }

      Linking.openURL(targetUrl).catch(() => {});
    },
    [isAllowedAuthUrl],
  );

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEB_BASE_URL}/` }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      javaScriptCanOpenWindowsAutomatically
      originWhitelist={[
        "https://semo-xi.vercel.app",
        "https://*.vercel.app",
        "https://kauth.kakao.com",
        "https://*.kakao.com",
        "https://appleid.apple.com",
        "https://*.apple.com",
      ]}
      onShouldStartLoadWithRequest={handleShouldStart}
      onOpenWindow={handleOpenWindow}
      onMessage={handleMessage}
    />
  );
};

export default WebViewScreen;
