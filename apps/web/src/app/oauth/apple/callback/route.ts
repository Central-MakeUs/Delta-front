import { type NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_KEY = "delta:access-token";
const REFRESH_TOKEN_KEY = "delta:refresh-token";

// Apple은 response_mode: "form_post" 로 인가코드를 POST로 전송한다.
// 프론트엔드가 redirect_uri 를 받으므로 이 핸들러가 수신 후 백엔드로 code를 전달한다.
export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const loginUrl = `${origin}/login`;

  let code: string | null = null;
  let userJson: string | null = null;

  try {
    const form = await req.formData();
    code = form.get("code") as string | null;
    userJson = form.get("user") as string | null;
  } catch {
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    return NextResponse.redirect(loginUrl);
  }

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) {
    return NextResponse.redirect(loginUrl);
  }

  let user: unknown = null;
  try {
    if (userJson) user = JSON.parse(userJson);
  } catch {}

  try {
    const backendRes = await fetch(`${apiBase}/api/v1/auth/apple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, user }),
    });

    if (!backendRes.ok) {
      return NextResponse.redirect(loginUrl);
    }

    const rawAccess = backendRes.headers.get("authorization") ?? "";
    const accessToken = rawAccess.replace(/^Bearer\s+/i, "").trim() || null;
    const refreshToken = backendRes.headers.get("refresh-token") ?? null;

    const body = await backendRes.json().catch(() => null);
    const isNewUser = body?.data?.isNewUser === true;
    const redirectPath = isNewUser ? "/login/info" : "/";

    // 서버사이드에서 localStorage 직접 접근 불가 → localStorage 설정 후 리다이렉트하는 HTML 반환
    const payload = JSON.stringify({ accessToken, refreshToken, redirectPath })
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    try {
      var d = ${payload};
      if (d.accessToken) localStorage.setItem("${ACCESS_TOKEN_KEY}", d.accessToken);
      if (d.refreshToken) localStorage.setItem("${REFRESH_TOKEN_KEY}", d.refreshToken);
      window.location.replace(d.redirectPath);
    } catch (e) {
      window.location.replace("/login");
    }
  </script>
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}
