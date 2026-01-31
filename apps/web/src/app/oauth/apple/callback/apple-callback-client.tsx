"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { useAppleExchangeMutation } from "@/shared/apis/auth/hooks/use-apple-exchange-mutation";
import { userApi } from "@/shared/apis/user/user-api";
import Loading from "@/shared/components/loading/loading";

const CONSUMED_LOGIN_KEY = "apple:consumed-login-key";

const AppleCallbackView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exchange = useAppleExchangeMutation();
  const executedRef = useRef(false);

  const loginKey = searchParams.get("loginKey");
  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (executedRef.current) return;

    const goLogin = (reason?: string) => {
      if (process.env.NODE_ENV !== "production" && reason) {
        console.warn("[apple-callback]", reason);
      }
      window.sessionStorage.removeItem(CONSUMED_LOGIN_KEY);
      router.replace(ROUTES.AUTH.LOGIN);
    };

    if (errorParam) {
      goLogin("error param: " + errorParam);
      return;
    }

    if (!loginKey || loginKey.trim() === "") {
      goLogin("missing loginKey");
      return;
    }

    const consumed = window.sessionStorage.getItem(CONSUMED_LOGIN_KEY);
    if (consumed === loginKey) {
      router.replace(ROUTES.HOME);
      return;
    }

    executedRef.current = true;
    window.sessionStorage.setItem(CONSUMED_LOGIN_KEY, loginKey);

    exchange
      .mutateAsync({ loginKey })
      .then(async (data) => {
        const profile = await userApi.getMyProfile();
        const needsSignupInfo =
          profile.nickname == null ||
          profile.nickname.trim() === "" ||
          data.isNewUser === true;
        if (needsSignupInfo) {
          router.replace(ROUTES.AUTH.SIGNUP_INFO);
        } else {
          router.replace(ROUTES.HOME);
        }
      })
      .catch((e) => {
        window.sessionStorage.removeItem(CONSUMED_LOGIN_KEY);
        goLogin("exchange failed");
        if (process.env.NODE_ENV !== "production") {
          console.error("[apple-callback] exchange error", e);
        }
      });
  }, [loginKey, errorParam, router, exchange]);

  return (
    <Loading variant="overlay" message="로그인 처리 중..." />
  );
};

export default AppleCallbackView;
