"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "@/app/login/login-decorations";
import { googleOAuth } from "@/shared/apis/auth/google-oauth";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import * as s from "@/app/login/login.css";
import {
  isReactNativeWebView,
  postOAuthMessage,
} from "@/shared/apis/auth/native-bridge";
import { useGoogleLoginMutation } from "@/shared/apis/auth/hooks/use-google-login-mutation";
import { useKakaoLoginMutation } from "@/shared/apis/auth/hooks/use-kakao-login-mutation";
import { ROUTES } from "@/shared/constants/routes";

const AndroidLoginPage = () => {
  const router = useRouter();
  const googleLogin = useGoogleLoginMutation();
  const kakaoLogin = useKakaoLoginMutation();

  const handleLoginSuccess = useCallback(
    (isNewUser?: boolean) => {
      router.replace(isNewUser ? ROUTES.AUTH.SIGNUP_INFO : ROUTES.HOME);
    },
    [router]
  );

  useEffect(() => {
    const onKakaoAuth = (e: Event) => {
      const { accessToken } =
        (e as CustomEvent<{ accessToken: string }>).detail ?? {};
      if (!accessToken) return;
      kakaoLogin.mutate(
        { code: accessToken },
        { onSuccess: (data) => handleLoginSuccess(data?.isNewUser) }
      );
    };

    const onGoogleAuth = (e: Event) => {
      const { serverAuthCode } =
        (e as CustomEvent<{ serverAuthCode: string }>).detail ?? {};
      if (!serverAuthCode) return;
      googleLogin.mutate(
        { code: serverAuthCode },
        { onSuccess: (data) => handleLoginSuccess(data?.isNewUser) }
      );
    };

    window.addEventListener("nativeGoogleAuth", onGoogleAuth);
    window.addEventListener("nativeKakaoAuth", onKakaoAuth);
    return () => {
      window.removeEventListener("nativeGoogleAuth", onGoogleAuth);
      window.removeEventListener("nativeKakaoAuth", onKakaoAuth);
    };
  }, [googleLogin, kakaoLogin, handleLoginSuccess]);

  const onGoogleStart = () => {
    const url = googleOAuth.buildAuthorizeUrl();
    if (isReactNativeWebView()) {
      postOAuthMessage(url, googleOAuth.buildRedirectUri());
    } else {
      window.location.assign(url);
    }
  };

  const onKakaoStart = () => {
    const url = kakaoOAuth.buildAuthorizeUrl();
    if (isReactNativeWebView()) {
      postOAuthMessage(url, kakaoOAuth.buildRedirectUri());
    } else {
      window.location.assign(url);
    }
  };

  return (
    <main className={s.page}>
      <LoginDecorations />

      <div className={s.content}>
        <header className={s.header}>
          <Icon width={13.3} height={4.2} name="logo-default" />
          <p className={s.tagline}>나만의 수학 오답노트</p>
        </header>

        <section className={s.actions} aria-label="소셜 로그인">
          <Button
            icon="google"
            label="Google로 시작하기"
            tone="google"
            onClick={onGoogleStart}
          />
          <Button
            icon="kakao"
            label="Kakao로 시작하기"
            tone="kakao"
            onClick={onKakaoStart}
          />
        </section>
      </div>
    </main>
  );
};

export default AndroidLoginPage;
