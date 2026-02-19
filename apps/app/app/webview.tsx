import React, { useCallback, useRef } from "react";
import { WebView } from "react-native-webview";

const WEB_BASE_URL = "https://semo-xi.vercel.app";

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);

  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const data = JSON.parse(event.nativeEvent.data) as {
          type: string;
          payload?: unknown;
        };
        if (data.type === "CHECKOUT_CLICK") {
        }
        if (data.type === "NAVIGATION_BACK") {
          webViewRef.current?.goBack();
        }
      } catch {}
    },
    []
  );

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEB_BASE_URL}/` }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      originWhitelist={["https://semo-xi.vercel.app", "https://*.vercel.app"]}
      onMessage={handleMessage}
    />
  );
};

export default WebViewScreen;
