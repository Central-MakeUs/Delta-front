"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { setAuthFresh } from "@/shared/apis/auth/auth-events";
import { googleOAuth } from "@/shared/apis/auth/google-oauth";
import { useGoogleLoginMutation } from "@/shared/apis/auth/hooks/use-google-login-mutation";

type GoogleCallbackClientProps = {
  code: string | null;
  state: string | null;
  googleError: string | null;
  googleErrorDesc: string | null;
};

const CONSUMED_CODE_KEY = "google:consumed-code";

const GoogleCallbackClient = ({
  code,
  state,
  googleError,
  googleErrorDesc,
}: GoogleCallbackClientProps) => {
  const router = useRouter();
  const login = useGoogleLoginMutation();
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const redirectLogin = (reason: string, extra?: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[google-callback] redirect to login:", reason, extra);
      }
      router.replace(ROUTES.AUTH.LOGIN);
    };

    const sp = new URLSearchParams(window.location.search);

    const resolvedCode = code ?? sp.get("code");
    const resolvedState = state ?? sp.get("state");
    const resolvedError = googleError ?? sp.get("error");
    const resolvedErrorDesc = googleErrorDesc ?? sp.get("error_description");

    if (resolvedError) {
      redirectLogin("google returned error", {
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

    const ok = googleOAuth.consumeState(resolvedState);
    if (!ok) {
      window.sessionStorage.removeItem(CONSUMED_CODE_KEY);
      redirectLogin("state validation failed", { resolvedState });
      return;
    }

    void (async () => {
      try {
        const response = await login.mutateAsync({ code: resolvedCode });
        setAuthFresh();
        const { isNewUser } = response;
        if (isNewUser) {
          router.replace(ROUTES.AUTH.SIGNUP_INFO);
        } else {
          router.replace(ROUTES.HOME);
        }
      } catch (e) {
        window.sessionStorage.removeItem(CONSUMED_CODE_KEY);
        redirectLogin("login mutate failed", e);
      }
    })();
  }, [code, state, googleError, googleErrorDesc, login, router]);

  return null;
};

export default GoogleCallbackClient;
