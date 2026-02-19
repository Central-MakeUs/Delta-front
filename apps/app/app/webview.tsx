import React, { useRef } from "react";
import { WebView } from "react-native-webview";

const getWebBaseUrl = () => {
  return "https://semo-xi.vercel.app";
};

const WebViewScreen = () => {
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
};

export default WebViewScreen;
