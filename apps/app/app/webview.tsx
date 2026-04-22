import React, { useCallback, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
  WebViewOpenWindowEvent,
} from "react-native-webview/lib/WebViewTypes";
import { useWebViewNativeTokenStorage } from "../hooks/use-webview-native-token-storage";
import type { TokenBridgeMessage } from "../hooks/use-webview-native-token-storage";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const { initialScript, handleTokenMessage } = useWebViewNativeTokenStorage();

  const isSafeExternalUrl = useCallback((url: string) => {
    return url.startsWith("https://") || url.startsWith("http://");
  }, []);

  const openExternalUrl = useCallback((url: string) => {
    Linking.openURL(url).catch((err) => {
      if (__DEV__)
        console.warn("[Linking] Failed to open URL:", url, err?.message);
    });
  }, []);

  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      const rawData = event.nativeEvent.data;

      if (!rawData || typeof rawData !== "string" || rawData.length > 500000)
        return;

      try {
        const data = JSON.parse(rawData);

        if (data?.type === "NAVIGATION_BACK") {
          webViewRef.current?.goBack();
          return;
        }

        if (
          data?.type === "OPEN_EXTERNAL_URL" &&
          typeof data.url === "string" &&
          isSafeExternalUrl(data.url)
        ) {
          openExternalUrl(data.url);
          return;
        }

        if (data?.type === "TOKEN_UPDATE" || data?.type === "TOKEN_CLEAR") {
          handleTokenMessage(data as TokenBridgeMessage);
          return;
        }

        if (data?.type === "OAUTH_START" && data.url && data.callbackPrefix) {
          void (async () => {
            const result = await WebBrowser.openAuthSessionAsync(
              data.url,
              data.callbackPrefix,
            );
            if (result.type === "success" && result.url) {
              webViewRef.current?.injectJavaScript(
                `window.location.replace(${JSON.stringify(result.url)});true;`,
              );
            }
          })();
          return;
        }
      } catch {}
    },
    [handleTokenMessage, isSafeExternalUrl, openExternalUrl],
  );

  const handleShouldStart = useCallback(
    (req: ShouldStartLoadRequest) => {
      const url = String(req?.url ?? "");
      if (!url) return false;

      const isHttp = url.startsWith("http://") || url.startsWith("https://");
      if (isHttp) return true;

      const isInternalScheme =
        url.startsWith("about:") ||
        url.startsWith("blob:") ||
        url.startsWith("data:");
      if (isInternalScheme) return true;

      if (url.startsWith("kakao")) {
        openExternalUrl(url);
        return false;
      }

      if (url.startsWith("intent:") || url.startsWith("market:")) {
        if (Platform.OS === "android") openExternalUrl(url);
        return false;
      }

      openExternalUrl(url);
      return false;
    },
    [openExternalUrl],
  );

  const handleError = useCallback((e: WebViewErrorEvent) => {
    if (__DEV__)
      console.warn(
        "[WebView] Load error:",
        e.nativeEvent?.description,
        e.nativeEvent?.code,
      );
  }, []);

  const handleHttpError = useCallback((e: WebViewHttpErrorEvent) => {
    if (__DEV__)
      console.warn("[WebView] HTTP error:", e.nativeEvent?.statusCode);
  }, []);

  const handleOpenWindow = useCallback(
    (e: WebViewOpenWindowEvent) => {
      const url = String(e.nativeEvent?.targetUrl ?? "");
      if (!url || !isSafeExternalUrl(url)) return;
      openExternalUrl(url);
    },
    [isSafeExternalUrl, openExternalUrl],
  );

  // Keep the WebView hidden until SecureStore tokens are injected.
  if (initialScript === undefined) {
    return <View style={styles.webview} />;
  }

  return (
    <WebView
      ref={webViewRef}
      style={styles.webview}
      source={{ uri: `${WEB_BASE_URL}/?platform=${Platform.OS}` }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      allowsInlineMediaPlayback
      mediaCapturePermissionGrantType="prompt"
      originWhitelist={["*"]}
      injectedJavaScriptBeforeContentLoaded={initialScript}
      onShouldStartLoadWithRequest={handleShouldStart}
      onOpenWindow={handleOpenWindow}
      onMessage={handleMessage}
      onError={handleError}
      onHttpError={handleHttpError}
      onContentProcessDidTerminate={() => webViewRef.current?.reload()}
    />
  );
};

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: "#FFFFFF" },
});

export default WebViewScreen;
