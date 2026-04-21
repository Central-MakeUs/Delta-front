"use client";

import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "@/app/login/login-decorations";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import { appleOAuth } from "@/shared/apis/auth/apple-oauth";
import * as s from "@/app/login/login.css";
import {
  isReactNativeWebView,
  postOAuthMessage,
} from "@/shared/apis/auth/native-bridge";

const IosLoginPage = () => {
  const onKakaoStart = () => {
    const url = kakaoOAuth.buildAuthorizeUrl();
    if (isReactNativeWebView()) {
      postOAuthMessage(url, kakaoOAuth.buildRedirectUri());
    } else {
      window.location.assign(url);
    }
  };

  const onAppleStart = () => {
    const url = appleOAuth.buildAuthorizeUrl();
    if (!url) return;
    if (isReactNativeWebView()) {
      postOAuthMessage(url, `${window.location.origin}/oauth/apple/callback`);
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
