"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  AUTH_LOGOUT_EVENT,
  consumeAuthFresh,
} from "@/shared/apis/auth/auth-events";
import { ROUTES } from "@/shared/constants/routes";

const shouldSkipRedirect = (pathname: string | null) => {
  if (!pathname) return true;
  if (pathname === ROUTES.AUTH.LOGIN) return true;
  if (pathname.startsWith(ROUTES.AUTH.SIGNUP_INFO)) return true;
  if (pathname.startsWith("/oauth")) return true;
  return false;
};

export const AuthLogoutListener = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleAuthLogout = () => {
      if (shouldSkipRedirect(pathname)) return;
      if (consumeAuthFresh()) return;
      router.replace(ROUTES.AUTH.LOGIN);
    };

    window.addEventListener(AUTH_LOGOUT_EVENT, handleAuthLogout);
    return () =>
      window.removeEventListener(AUTH_LOGOUT_EVENT, handleAuthLogout);
  }, [router, pathname]);

  return null;
};
