import { initializeKakaoSDK } from "@react-native-kakao/core";
import { login } from "@react-native-kakao/user";

export type KakaoSignInResult =
  | { status: "success"; accessToken: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

export const performKakaoLogin = async (): Promise<KakaoSignInResult> => {
  try {
    initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? "");
    const token = await login();
    if (!token?.accessToken) {
      return { status: "error", reason: "missing-access-token", message: "카카오 액세스 토큰을 받지 못했습니다." };
    }
    return { status: "success", accessToken: token.accessToken };
  } catch (error: any) {
    if (/cancel/i.test(error?.message ?? "")) {
      return { status: "cancelled" };
    }
    return { status: "error", reason: "sign-in-failed", message: error?.message ?? "카카오 로그인 실패" };
  }
};
