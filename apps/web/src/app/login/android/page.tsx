"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "@/app/login/login-decorations";
import { googleOAuth } from "@/shared/apis/auth/google-oauth";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import * as s from "@/app/login/login.css";
import {
  isReactNativeWebView,
  postNativeGoogleLogin,
  postNativeKakaoLogin,
  waitForNativeResult,
  type NativeGoogleLoginResult,
  type NativeKakaoLoginResult,
} from "@/shared/apis/auth/native-bridge";
import { useGoogleLoginMutation } from "@/shared/apis/auth/hooks/use-google-login-mutation";
import { useKakaoLoginMutation } from "@/shared/apis/auth/hooks/use-kakao-login-mutation";
import { ROUTES } from "@/shared/constants/routes";
import { toastError } from "@/shared/components/toast/toast";

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

  const onGoogleStart = async () => {
    if (!isReactNativeWebView()) {
      window.location.assign(googleOAuth.buildAuthorizeUrl());
      return;
    }
    postNativeGoogleLogin();
    const result = await waitForNativeResult<NativeGoogleLoginResult>(
      "NATIVE_GOOGLE_LOGIN_RESULT"
    );
    if (result.status === "cancelled") return;
    if (result.status !== "success") {
      toastError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    googleLogin.mutate(
      { code: result.serverAuthCode },
      {
        onSuccess: (data) => handleLoginSuccess(data?.isNewUser),
        onError: () =>
          toastError("구글 로그인에 실패했습니다. 다시 시도해주세요."),
      }
    );
  };

  const onKakaoStart = async () => {
    if (!isReactNativeWebView()) {
      window.location.assign(kakaoOAuth.buildAuthorizeUrl());
      return;
    }
    postNativeKakaoLogin();
    const result = await waitForNativeResult<NativeKakaoLoginResult>(
      "NATIVE_KAKAO_LOGIN_RESULT"
    );
    if (result.status === "cancelled") return;
    if (result.status !== "success") {
      toastError("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    kakaoLogin.mutate(
      { code: result.authorizationCode },
      {
        onSuccess: (data) => handleLoginSuccess(data?.isNewUser),
        onError: () =>
          toastError("카카오 로그인에 실패했습니다. 다시 시도해주세요."),
      }
    );
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
