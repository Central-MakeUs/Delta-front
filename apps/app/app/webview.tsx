import React, { useRef } from "react";
import { WebView } from "react-native-webview";

const getWebBaseUrl = () => {
  return "https://semo-xi.vercel.app";
};

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);

  const webUrl = `${getWebBaseUrl()}/`;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: webUrl }}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      originWhitelist={["*"]}
    />
  );
}
