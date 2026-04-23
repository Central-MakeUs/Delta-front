import { bridge } from "@webview-bridge/react-native";
import { performKakaoLogin } from "../native-auth/kakao";
import { performAppleLogin } from "../native-auth/apple";
import { performGoogleLogin } from "../native-auth/google";
import type { KakaoSignInResult } from "../native-auth/kakao";
import type { AppleSignInResult } from "../native-auth/apple";
import type { GoogleSignInResult } from "../native-auth/google";

export type { KakaoSignInResult, AppleSignInResult, GoogleSignInResult };

export const appBridge = bridge({
  async signInWithKakao(): Promise<KakaoSignInResult> {
    return performKakaoLogin();
  },
  async signInWithApple(): Promise<AppleSignInResult> {
    return performAppleLogin();
  },
  async signInWithGoogle(): Promise<GoogleSignInResult> {
    return performGoogleLogin();
  },
});

export type AppBridge = typeof appBridge;
