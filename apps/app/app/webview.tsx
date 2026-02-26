import React, { useCallback, useRef } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);

  const openExternalUrl = useCallback((url: string) => {
    Linking.openURL(url).catch((err) => {
      if (__DEV__)
        console.warn("[Linking] Failed to open URL:", url, err?.message);
    });
  }, []);

  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const data = JSON.parse(event.nativeEvent.data) as {
          type: string;
          payload?: unknown;
        };

        if (data.type === "NAVIGATION_BACK") {
          webViewRef.current?.goBack();
        }
      } catch { }
    },
    [],
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

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEB_BASE_URL}/` }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      allowsInlineMediaPlayback
      mediaCapturePermissionGrantType="prompt"
      originWhitelist={["*"]}
      onShouldStartLoadWithRequest={handleShouldStart}
      onMessage={handleMessage}
      onError={handleError}
      onHttpError={handleHttpError}
    />
  );
};

export default WebViewScreen;
