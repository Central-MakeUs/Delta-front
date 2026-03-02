import React, { useCallback, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

type SafeEdge = "top" | "bottom" | "left" | "right";

const SAFE_EDGE_SET: ReadonlySet<SafeEdge> = new Set(["top", "bottom", "left", "right"]);

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [safeEdges, setSafeEdges] = useState<SafeEdge[]>(["top", "bottom"]);

  const openExternalUrl = useCallback((url: string) => {
    Linking.openURL(url).catch((err) => {
      if (__DEV__) console.warn("[Linking] Failed to open URL:", url, err?.message);
    });
  }, []);

  const handleMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    const rawData = event.nativeEvent.data;

    if (!rawData || typeof rawData !== "string" || rawData.length > 500000) return;

    try {
      const data = JSON.parse(rawData);

      if (data?.type === "NAVIGATION_BACK") {
        webViewRef.current?.goBack();
        return;
      }

      if (data?.type === "SAFE_AREA_EDGES") {
        if (!Array.isArray(data?.edges)) return;

        const nextEdges = data.edges.filter(
          (edge: unknown): edge is SafeEdge =>
            typeof edge === "string" && SAFE_EDGE_SET.has(edge as SafeEdge),
        );

        if (nextEdges.length === data.edges.length) {
          setSafeEdges(nextEdges);
        }
      }
    } catch {}
  }, []);

  const handleShouldStart = useCallback(
    (req: ShouldStartLoadRequest) => {
      const url = String(req?.url ?? "");
      if (!url) return false;

      const isHttp = url.startsWith("http://") || url.startsWith("https://");
      if (isHttp) return true;

      const isInternalScheme =
        url.startsWith("about:") || url.startsWith("blob:") || url.startsWith("data:");
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
      console.warn("[WebView] Load error:", e.nativeEvent?.description, e.nativeEvent?.code);
  }, []);

  const handleHttpError = useCallback((e: WebViewHttpErrorEvent) => {
    if (__DEV__) console.warn("[WebView] HTTP error:", e.nativeEvent?.statusCode);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={safeEdges}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  webview: { flex: 1, backgroundColor: "#FFFFFF" },
});

export default WebViewScreen;
