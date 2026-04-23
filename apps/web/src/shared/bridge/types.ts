import type { BridgeStore } from "@webview-bridge/web";

export type KakaoSignInResult =
  | { status: "success"; accessToken: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

export type AppleSignInResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "error"; reason: string; message?: string };

export type GoogleSignInResult =
  | { status: "success"; serverAuthCode: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

type AppBridgeMethods = {
  signInWithKakao(): Promise<KakaoSignInResult>;
  signInWithApple(): Promise<AppleSignInResult>;
  signInWithGoogle(): Promise<GoogleSignInResult>;
};

export type AppBridge = BridgeStore<AppBridgeMethods>;
