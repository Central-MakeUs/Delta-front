"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "@/app/login/login-decorations";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import { appleOAuth } from "@/shared/apis/auth/apple-oauth";
import * as s from "@/app/login/login.css";
import {
  isReactNativeWebView,
  postNativeKakaoLogin,
  postNativeAppleLogin,
  type NativeKakaoLoginResult,
  type NativeAppleLoginResult,
} from "@/shared/apis/auth/native-bridge";
import { useKakaoLoginMutation } from "@/shared/apis/auth/hooks/use-kakao-login-mutation";
import { useAppleLoginMutation } from "@/shared/apis/auth/hooks/use-apple-login-mutation";
import { ROUTES } from "@/shared/constants/routes";

const IosLoginPage = () => {
  const router = useRouter();
  const kakaoLogin = useKakaoLoginMutation();
  const appleLogin = useAppleLoginMutation();

  const handleLoginSuccess = useCallback(
    (isNewUser?: boolean) => {
      router.replace(isNewUser ? ROUTES.AUTH.SIGNUP_INFO : ROUTES.HOME);
    },
    [router]
  );

  useEffect(() => {
    if (!isReactNativeWebView()) return;

    const onKakaoResult = (e: Event) => {
      const result = (e as CustomEvent<NativeKakaoLoginResult>).detail;
      if (!result || result.status !== "success") return;
      kakaoLogin.mutate(
        { code: result.accessToken },
        { onSuccess: (data) => handleLoginSuccess(data?.isNewUser) }
      );
    };

    const onAppleResult = (e: Event) => {
      const result = (e as CustomEvent<NativeAppleLoginResult>).detail;
      if (!result || result.status !== "success") return;
      appleLogin.mutate(
        { code: result.authorizationCode },
        { onSuccess: (data) => handleLoginSuccess(data?.isNewUser) }
      );
    };

    window.addEventListener("nativeKakaoLoginResult", onKakaoResult);
    window.addEventListener("nativeAppleLoginResult", onAppleResult);
    return () => {
      window.removeEventListener("nativeKakaoLoginResult", onKakaoResult);
      window.removeEventListener("nativeAppleLoginResult", onAppleResult);
    };
  }, [kakaoLogin, appleLogin, handleLoginSuccess]);

  const onKakaoStart = () => {
    if (isReactNativeWebView()) {
      postNativeKakaoLogin();
    } else {
      window.location.assign(kakaoOAuth.buildAuthorizeUrl());
    }
  };

  const onAppleStart = () => {
    if (isReactNativeWebView()) {
      postNativeAppleLogin();
    } else {
      const url = appleOAuth.buildAuthorizeUrl();
      if (!url) return;
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
            icon="kakao"
            label="Kakao로 시작하기"
            tone="kakao"
            onClick={onKakaoStart}
          />
          <Button
            icon="apple"
            label="Apple로 시작하기"
            tone="dark"
            onClick={onAppleStart}
          />
        </section>
      </div>
    </main>
  );
};

export default IosLoginPage;
