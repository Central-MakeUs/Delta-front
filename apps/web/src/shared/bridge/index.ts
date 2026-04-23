import { linkBridge } from "@webview-bridge/web";
import type { AppBridge } from "./types";

export type { KakaoSignInResult, AppleSignInResult, GoogleSignInResult } from "./types";

let _bridge: ReturnType<typeof linkBridge<AppBridge>> | null = null;

export function getNativeBridge() {
  if (typeof window === "undefined") return null;
  if (!_bridge) {
    _bridge = linkBridge<AppBridge>({ throwOnError: false });
  }
  return _bridge;
}
