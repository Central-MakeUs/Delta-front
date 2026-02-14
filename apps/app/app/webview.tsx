import React, { useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import Constants from "expo-constants";

const getWebBaseUrl = () => {
  return "https://semo-xi.vercel.app";
};

type WebToNativeMessage =
  | { type: "CHECKOUT_CLICK"; payload?: Record<string, unknown> }
  | { type: string; payload?: unknown };

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);

  const webUrl = `${getWebBaseUrl()}/`;

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as WebToNativeMessage;

      switch (data.type) {
        case "CHECKOUT_CLICK": {
          console.log("[WebView] 결제 버튼 클릭 로그 수집:", data.payload);
          break;
        }
        default:
          console.log("[WebView] 수신 메시지:", data);
      }
    } catch (e) {
      console.warn("[WebView] 메시지 파싱 실패:", e);
    }
  };

  const handleLoadEnd = () => {
    const message = JSON.stringify({
      type: "INIT_DATA",
      payload: { source: "expo", version: Constants.expoConfig?.version },
    });
    webViewRef.current?.postMessage(message);
  };

  return (
    <>
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
