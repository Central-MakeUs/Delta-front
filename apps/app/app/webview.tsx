import React, { useRef } from "react";
import { Platform } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Stack } from "expo-router";
import Constants from "expo-constants";

/**
 * WebView에서 로드할 웹 URL
 * - 개발: 로컬 Next.js (Android 에뮬레이터는 10.0.2.2 사용)
 * - 운영: 환경변수 또는 실제 배포 URL
 */
const getWebBaseUrl = () => {
  const base =
    process.env.EXPO_PUBLIC_WEB_URL ??
    (__DEV__
      ? Platform.select({
          android: "http://10.0.2.2:3000",
          ios: "http://localhost:3000",
          default: "http://localhost:3000",
        })
      : process.env.EXPO_PUBLIC_WEB_URL);

  return base;
};

/** 웹 → 네이티브 메시지 타입 */
type WebToNativeMessage =
  | { type: "CHECKOUT_CLICK"; payload?: Record<string, unknown> }
  | { type: string; payload?: unknown };

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);

  const webUrl = `${getWebBaseUrl()}/`;

  // 웹(Next.js)에서 보낸 메시지 처리
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as WebToNativeMessage;

      switch (data.type) {
        case "CHECKOUT_CLICK": {
          console.log("[WebView] 결제 버튼 클릭 로그 수집:", data.payload);
          // Native 결제 모듈 호출, 알림 등 실행
          break;
        }
        default:
          console.log("[WebView] 수신 메시지:", data);
      }
    } catch (e) {
      console.warn("[WebView] 메시지 파싱 실패:", e);
    }
  };

  // 웹 로드 완료 시 초기 데이터 전송
  const handleLoadEnd = () => {
    const message = JSON.stringify({
      type: "INIT_DATA",
      payload: { source: "expo", version: Constants.expoConfig?.version },
    });
    webViewRef.current?.postMessage(message);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "세모",
          headerShown: true,
        }}
      />
      <WebView
        ref={webViewRef}
        source={{ uri: webUrl }}
        onMessage={handleMessage}
        onLoadEnd={handleLoadEnd}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        originWhitelist={["*"]}
      />
    </>
  );
}
