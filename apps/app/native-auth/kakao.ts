import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export type KakaoSignInResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

// Kakao Developer Console > 앱 > 플랫폼 > Android/iOS 에 등록된 리다이렉트 URI와 동일해야 함
// 예: app://oauth/kakao
const REDIRECT_URI = Linking.createURL("oauth/kakao");

// Kakao Developer Console > 앱 키 > REST API 키
const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? "";

function generateState(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(4);
    crypto.getRandomValues(arr);
    return Array.from(arr)
      .map((n) => n.toString(16))
      .join("");
  }
  return Math.random().toString(36).slice(2);
}

export const performKakaoLogin = async (): Promise<KakaoSignInResult> => {
  const state = generateState();

  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    state,
  });

  const authUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

  let result: WebBrowser.WebBrowserAuthSessionResult;
  try {
    result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);
  } catch (e: unknown) {
    return {
      status: "error",
      reason: "browser-error",
      message: e instanceof Error ? e.message : "인앱 브라우저 오류",
    };
  }

  if (result.type === "cancel" || result.type === "dismiss") {
    return { status: "cancelled" };
  }

  if (result.type !== "success") {
    return { status: "error", reason: "auth-failed", message: "카카오 인증 실패" };
  }

  try {
    const parsed = new URL(result.url);
    const error = parsed.searchParams.get("error");
    if (error) {
      return {
        status: "error",
        reason: error,
        message: parsed.searchParams.get("error_description") ?? "카카오 인증 오류",
      };
    }

    const code = parsed.searchParams.get("code");
    if (!code) {
      return {
        status: "error",
        reason: "missing-code",
        message: "인가코드를 받지 못했습니다",
      };
    }

    return { status: "success", authorizationCode: code };
  } catch {
    return { status: "error", reason: "parse-error", message: "응답 파싱 실패" };
  }
};
