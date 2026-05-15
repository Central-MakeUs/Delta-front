import { login } from "@react-native-seoul/kakao-login";

export type KakaoSignInResult =
  | { status: "success"; accessToken: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

export const performKakaoLogin = async (): Promise<KakaoSignInResult> => {
  try {
    const result = await login();
    return { status: "success", accessToken: result.accessToken };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    if (/cancel/i.test(message) || /user cancel/i.test(message)) {
      return { status: "cancelled" };
    }
    return {
      status: "error",
      reason: "sign-in-failed",
      message: message || "카카오 로그인 실패",
    };
  }
};
