"use client";

import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import LoginDecorations from "./login-decorations";
import * as s from "./login.css";

const LoginPage = () => {
  const router = useRouter();

  const onKakaoStart = () => {
    router.push("/");
  };

  const onAppleStart = () => {
    router.push("/");
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
            label="Kakao로 시작하기"
            tone="kakao"
            onClick={onKakaoStart}
          />
          <Button label="Apple로 시작하기" tone="dark" onClick={onAppleStart} />
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
