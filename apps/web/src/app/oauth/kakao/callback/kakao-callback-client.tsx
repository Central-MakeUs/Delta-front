"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { kakaoOAuth } from "@/shared/apis/auth/kakao-oauth";
import { useKakaoLoginMutation } from "@/shared/apis/auth/hooks/use-kakao-login-mutation";

type KakaoCallbackClientProps = {
  code: string | null;
  state: string | null;
  kakaoError: string | null;
  kakaoErrorDesc: string | null;
};

const CONSUMED_CODE_KEY = "kakao:consumed-code";

const KakaoCallbackClient = ({
  code,
  state,
  kakaoError,
  kakaoErrorDesc,
}: KakaoCallbackClientProps) => {
  const router = useRouter();
  const login = useKakaoLoginMutation();
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const redirectLogin = (reason: string, extra?: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[kakao-callback] redirect to login:", reason, extra);
      }
      router.replace(ROUTES.AUTH.LOGIN);
    };

    const sp = new URLSearchParams(window.location.search);

    const resolvedCode = code ?? sp.get("code");
    const resolvedState = state ?? sp.get("state");
    const resolvedError = kakaoError ?? sp.get("error");
    const resolvedErrorDesc = kakaoErrorDesc ?? sp.get("error_description");

    if (resolvedError) {
      redirectLogin("kakao returned error", {
        resolvedError,
        resolvedErrorDesc,
      });
      return;
    }

    if (!resolvedCode || !resolvedState) {
      redirectLogin("missing code/state", {
        resolvedCode,
        resolvedState,
        href: window.location.href,
      });
      return;
    }

    const consumed = window.sessionStorage.getItem(CONSUMED_CODE_KEY);
    if (consumed === resolvedCode) {
      router.replace(ROUTES.HOME);
      return;
    }
    window.sessionStorage.setItem(CONSUMED_CODE_KEY, resolvedCode);

    const ok = kakaoOAuth.consumeState(resolvedState);
    if (!ok) {
      window.sessionStorage.removeItem(CONSUMED_CODE_KEY);
      redirectLogin("state validation failed", { resolvedState });
      return;
    }

    void (async () => {
      try {
        await login.mutateAsync({ code: resolvedCode });
        router.replace(ROUTES.HOME);
      } catch (e) {
        window.sessionStorage.removeItem(CONSUMED_CODE_KEY);
        redirectLogin("login mutate failed", e);
      }
    })();
  }, [code, state, kakaoError, kakaoErrorDesc, login, router]);

  return null;
};

export default KakaoCallbackClient;
