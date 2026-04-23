import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export type KakaoSignInResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

// Kakao Developer Console > 내 앱 > 앱 키 > REST API 키
const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? "";

// Kakao Developer Console > 내 앱 > 카카오 로그인 > Redirect URI 에 등록
const REDIRECT_URI = Linking.createURL("oauth/kakao"); // 예: app://oauth/kakao

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

function parseCode(urlStr: string): string | null {
  try {
    // app://oauth/kakao?code=XXX 형태를 파싱
    const parsed = new URL(urlStr);
    return parsed.searchParams.get("code");
  } catch {
    // URL 파싱 실패 시 쿼리스트링 직접 파싱
    const match = urlStr.match(/[?&]code=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
}

async function loginWithKakaoTalk(state: string): Promise<KakaoSignInResult> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (result: KakaoSignInResult) => {
      if (settled) return;
      settled = true;
      subscription.remove();
      clearTimeout(timer);
      resolve(result);
    };

    // KakaoTalk이 인증 후 app://oauth/kakao?code=XXX 로 리다이렉트하면 이 이벤트가 발생
    const subscription = Linking.addEventListener("url", ({ url }) => {
      if (!url.includes("oauth/kakao")) return;

      const errorMatch = url.match(/[?&]error=([^&]+)/);
      if (errorMatch) {
        finish({ status: "error", reason: decodeURIComponent(errorMatch[1]), message: "카카오톡 인증 오류" });
        return;
      }

      const code = parseCode(url);
      if (code) {
        finish({ status: "success", authorizationCode: code });
      } else {
        finish({ status: "error", reason: "missing-code", message: "인가코드를 받지 못했습니다" });
      }
    });

    // 60초 타임아웃
    const timer = setTimeout(() => {
      finish({ status: "cancelled" });
    }, 60000);

    const kakaoTalkParams = new URLSearchParams({
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      state,
    });

    Linking.openURL(`kakaokompassauth://authorize?${kakaoTalkParams.toString()}`).catch(() => {
      finish({ status: "error", reason: "open-failed", message: "카카오톡을 열 수 없습니다" });
    });
  });
}

async function loginWithKakaoWeb(state: string): Promise<KakaoSignInResult> {
  const webParams = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    state,
  });

  const authUrl = `https://kauth.kakao.com/oauth/authorize?${webParams.toString()}`;

  let result: WebBrowser.WebBrowserAuthSessionResult;
  try {
    result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);
  } catch (e: unknown) {
    return {
      status: "error",
      reason: "browser-error",
      message: e instanceof Error ? e.message : "브라우저 오류",
    };
  }

  if (result.type === "cancel" || result.type === "dismiss") {
    return { status: "cancelled" };
  }

  if (result.type !== "success") {
    return { status: "error", reason: "auth-failed", message: "카카오 인증 실패" };
  }

  const code = parseCode(result.url);
  if (!code) {
    return { status: "error", reason: "missing-code", message: "인가코드를 받지 못했습니다" };
  }

  return { status: "success", authorizationCode: code };
}

export const performKakaoLogin = async (): Promise<KakaoSignInResult> => {
  const state = generateState();

  // KakaoTalk 설치 여부 확인 (iOS: LSApplicationQueriesSchemes에 kakaokompassauth 등록 필요)
  const isKakaoTalkInstalled = await Linking.canOpenURL("kakaokompassauth://").catch(() => false);

  if (isKakaoTalkInstalled) {
    return loginWithKakaoTalk(state);
  }

  // 미설치 시 Kakao 웹 로그인으로 폴백
  return loginWithKakaoWeb(state);
};
