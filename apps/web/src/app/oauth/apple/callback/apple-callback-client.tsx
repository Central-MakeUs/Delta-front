"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { appleOAuth } from "@/shared/apis/auth/apple-oauth";

type AppleCallbackClientProps = {
  state: string | null;
  error: string | null;
};

const AppleCallbackClient = ({ state, error }: AppleCallbackClientProps) => {
  const router = useRouter();
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const redirectLogin = (reason: string, extra?: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[apple-callback] redirect to login:", reason, extra);
      }
      router.replace(ROUTES.AUTH.LOGIN);
    };

    const sp = new URLSearchParams(window.location.search);
    const resolvedState = state ?? sp.get("state");
    const resolvedError = error ?? sp.get("error");

    if (resolvedError) {
      redirectLogin("backend returned error", { resolvedError });
      return;
    }

    if (resolvedState) {
      const ok = appleOAuth.consumeState(resolvedState);
      if (!ok) {
        redirectLogin("state validation failed", { resolvedState });
        return;
      }
    }

    router.replace(ROUTES.AUTH.SIGNUP_INFO);
  }, [state, error, router]);

  return null;
};

export default AppleCallbackClient;
