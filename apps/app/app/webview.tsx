import React, { useCallback, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { performKakaoLogin } from "@/native-auth/kakao";
import { performAppleLogin } from "@/native-auth/apple";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";

const WEB_BASE_URL = "https://semo-xi.kro.kr";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);

  const injectEvent = useCallback((eventName: string, detail: object) => {
    const js = `window.dispatchEvent(new CustomEvent(${JSON.stringify(eventName)},{detail:${JSON.stringify(detail)}}));true;`;
    webViewRef.current?.injectJavaScript(js);
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

        if (data?.type === "OAUTH_START" && data.url) {
          const url: string = data.url;

          if (url.includes("kauth.kakao.com")) {
            void (async () => {
              try {
                const result = await performKakaoLogin();
                injectEvent("nativeKakaoAuth", result);
              } catch (err: any) {
                injectEvent("nativeKakaoAuthError", {
                  message: err?.message ?? "카카오 로그인 실패",
                });
              }
            })();
            return;
          }

          if (url.includes("appleid.apple.com")) {
            void (async () => {
              try {
                const result = await performAppleLogin();
                injectEvent("nativeAppleAuth", result);
              } catch (err: any) {
                injectEvent("nativeAppleAuthError", {
                  message: err?.message ?? "Apple 로그인 실패",
                });
              }
            })();
            return;
          }
        }
      } catch {}
    },
    [injectEvent],
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
      style={styles.webview}
      source={{ uri: `${WEB_BASE_URL}/?platform=${Platform.OS}` }}
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

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: "#FFFFFF" },
});

export default WebViewScreen;
