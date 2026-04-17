import React, { useCallback, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "",
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  offlineAccess: true,
});

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
          const url = data.url as string;
          const callbackPrefix = data.callbackPrefix as string | undefined;

          if (url.includes("accounts.google.com") && callbackPrefix) {
            const state = new URL(url).searchParams.get("state");
            void (async () => {
              try {
                await GoogleSignin.hasPlayServices({
                  showPlayServicesUpdateDialog: true,
                });
                const result = await GoogleSignin.signIn();
                const serverAuthCode = result.data?.serverAuthCode;
                if (!serverAuthCode) return;
                const params = new URLSearchParams({ code: serverAuthCode });
                if (state) params.set("state", state);
                const callbackUrl = `${callbackPrefix}?${params.toString()}`;
                webViewRef.current?.injectJavaScript(
                  `window.location.replace(${JSON.stringify(callbackUrl)});true;`
                );
              } catch (e: unknown) {
                const err = e as { code?: string };
                if (err?.code !== statusCodes.SIGN_IN_CANCELLED && __DEV__) {
                  console.warn("[GoogleSignin] error:", e);
                }
              }
            })();
            return;
          }

          webViewRef.current?.injectJavaScript(
            `window.location.replace(${JSON.stringify(url)});true;`
          );
          return;
        }
      } catch {}
    },
    []
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
    [openExternalUrl]
  );

  const handleError = useCallback((e: WebViewErrorEvent) => {
    if (__DEV__)
      console.warn(
        "[WebView] Load error:",
        e.nativeEvent?.description,
        e.nativeEvent?.code
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
