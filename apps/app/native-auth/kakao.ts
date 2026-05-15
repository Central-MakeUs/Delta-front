import * as WebBrowser from "expo-web-browser";

export type KakaoSignInResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

const NATIVE_KEY = "a51c4333b70b50271e9fbc532fadd600";
const KAKAO_SCHEME = `kakao${NATIVE_KEY}`;
const REDIRECT_URI = `${KAKAO_SCHEME}://oauth`;

export const performKakaoLogin = async (): Promise<KakaoSignInResult> => {
  try {
    const restApiKey = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? "";
    const authUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${restApiKey}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

    if (result.type !== "success") {
      return { status: "cancelled" };
    }

    const query = result.url.split("?")[1] ?? "";
    const params = new URLSearchParams(query);
    const error = params.get("error");

    if (error) {
      if (error === "access_denied") return { status: "cancelled" };
      return {
        status: "error",
        reason: error,
        message: params.get("error_description") ?? "카카오 로그인 실패",
      };
    }

    const code = params.get("code");
    if (!code) {
      return {
        status: "error",
        reason: "missing-code",
        message: "인증 코드를 받지 못했습니다.",
      };
    }

    return { status: "success", authorizationCode: code };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    if (/cancel/i.test(message)) return { status: "cancelled" };
    return {
      status: "error",
      reason: "sign-in-failed",
      message: message || "카카오 로그인 실패",
    };
  }
};
