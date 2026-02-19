"use client";

import { useCallback, useEffect } from "react";
import type { WebToNativeMessage, NativeToWebMessage } from "@/shared/types/webview-bridge";

/** WebView(Expo) 내에서 실행 중인지 여부 */
export const isInWebView = (): boolean => {
  if (typeof window === "undefined") return false;
  return typeof window.ReactNativeWebView?.postMessage === "function";
};

/** 웹 → 네이티브로 메시지 전송 */
export const postToNative = <T = unknown>(message: WebToNativeMessage<T>): void => {
  if (!isInWebView()) {
    console.log("ℹ️ [브릿지 확인] WebView 환경이 아니므로 메시지 전송 안 함");
    return;
  }
  try {
    const messageStr = JSON.stringify(message);
    window.ReactNativeWebView?.postMessage(messageStr);
    console.log("✅ [브릿지 확인] 웹에서 네이티브로 메시지 전송:", messageStr);
  } catch (e) {
    console.warn("⚠️ [브릿지 확인] postMessage 실패:", e);
  }
};

interface UseWebViewBridgeOptions {
  /** 네이티브 → 웹 메시지 수신 핸들러 */
  onMessage?: (message: NativeToWebMessage) => void;
}

/**
 * WebView 브릿지 훅
 * - 웹에서 네이티브로 메시지 전송: postToNative() 또는 sendMessage()
 * - 네이티브에서 웹으로 오는 메시지 수신: onMessage 옵션
 */
export const useWebViewBridge = (options?: UseWebViewBridgeOptions) => {
  const { onMessage } = options ?? {};

  const sendMessage = useCallback(<T = unknown>(message: WebToNativeMessage<T>) => {
    postToNative(message);
  }, []);

  useEffect(() => {
    if (!onMessage || typeof window === "undefined") return;

    const handler = (event: Event | MessageEvent) => {
      try {
        const dataStr =
          event instanceof MessageEvent ? event.data : (event as { data?: string }).data;
        if (typeof dataStr !== "string") return;
        const data = JSON.parse(dataStr) as NativeToWebMessage;
        console.log("✅ [브릿지 확인] 네이티브에서 웹으로 메시지 수신:", data);
        onMessage(data);
      } catch (e) {
        console.warn("⚠️ [브릿지 확인] JSON 파싱 실패:", e);
      }
    };

    // react-native-webview: 네이티브→웹 메시지는 document "message" 이벤트로 전달
    document.addEventListener("message", handler as EventListener);
    return () => document.removeEventListener("message", handler as EventListener);
  }, [onMessage]);

  // 브릿지 확인: 웹 로드 시 자동으로 테스트 메시지 전송
  useEffect(() => {
    if (!isInWebView()) {
      console.log("ℹ️ [브릿지 확인] WebView 환경이 아닙니다 (일반 브라우저)");
      return;
    }

    console.log("✅ [브릿지 확인] WebView 환경 감지됨, 테스트 메시지 전송");
    const testMessage = {
      type: "BRIDGE_TEST",
      payload: { message: "웹에서 네이티브로 메시지 전송 테스트!", timestamp: Date.now() },
    };
    postToNative(testMessage);
    console.log("✅ [브릿지 확인] 전송한 메시지:", testMessage);
  }, []);  

  return {
    isInWebView: isInWebView(),
    sendMessage,
  };
};
