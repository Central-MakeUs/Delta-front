/**
 * Expo/React Native WebView 브릿지 타입
 * react-native-webview의 postMessage는 window.ReactNativeWebView를 통해 노출됨
 */
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export type WebViewMessageType =
  | "CHECKOUT_CLICK"
  | "NAVIGATION_BACK"
  | string;

export type NativeToWebMessageType = "INIT_DATA" | string;

export interface WebToNativeMessage<T = unknown> {
  type: WebViewMessageType;
  payload?: T;
}

export interface NativeToWebMessage<T = unknown> {
  type: NativeToWebMessageType;
  payload?: T;
}
