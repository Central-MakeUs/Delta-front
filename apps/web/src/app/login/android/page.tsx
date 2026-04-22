"use client";

import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "@/app/login/login-decorations";
import { googleOAuth } from "@/shared/apis/auth/google-oauth";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import * as s from "@/app/login/login.css";

const AndroidLoginPage = () => {
  const onGoogleStart = () => {
    window.location.assign(googleOAuth.buildAuthorizeUrl());
  };

  const onKakaoStart = () => {
    window.location.assign(kakaoOAuth.buildAuthorizeUrl());
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
