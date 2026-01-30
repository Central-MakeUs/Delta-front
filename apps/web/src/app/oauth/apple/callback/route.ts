import { NextResponse } from "next/server";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import { ROUTES } from "@/shared/constants/routes";

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const formData = await request.formData();
    const code = formData.get("code");
    const userString = formData.get("user"); // 최초 로그인 시에만 존재 (JSON 문자열)

    if (!code || typeof code !== "string") {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url), {
        status: 303,
      });
    }

    let user: unknown = null;
    if (userString && typeof userString === "string") {
      try {
        user = JSON.parse(userString);
      } catch {
        user = null;
      }
    }

    // 서버 콘솔(터미널)에 출력
    console.log("[Apple Auth] code:", code);
    console.log("[Apple Auth] user:", user);

    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
      new URL(request.url).origin;
    const apiUrl = `${baseURL.replace(/\/$/, "")}${API_PATHS.AUTH.APPLE_LOGIN}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, user }),
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url), {
        status: 303,
      });
    }

    const signupInfoUrl = new URL(ROUTES.AUTH.SIGNUP_INFO, request.url).href;
    // 브라우저 콘솔에 code, user 출력 후 /login/info 로 이동 (JSON.stringify로 안전하게 삽입)
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
      console.log("[Apple Auth] code:", ${JSON.stringify(code)});
      console.log("[Apple Auth] user:", ${JSON.stringify(user)});
      window.location.replace(${JSON.stringify(signupInfoUrl)});
    </script><p>로그인 처리 중...</p></body></html>`;

    const htmlResponse = new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

    // 백엔드가 Set-Cookie로 세션/토큰을 주는 경우 클라이언트로 전달
    const setCookies =
      typeof res.headers.getSetCookie === "function"
        ? res.headers.getSetCookie()
        : [];
    if (setCookies.length) {
      setCookies.forEach((cookie) => {
        htmlResponse.headers.append("Set-Cookie", cookie);
      });
    } else {
      const single = res.headers.get("set-cookie");
      if (single) htmlResponse.headers.append("Set-Cookie", single);
    }

    return htmlResponse;
  } catch {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url), {
      status: 303,
    });
  }
};
