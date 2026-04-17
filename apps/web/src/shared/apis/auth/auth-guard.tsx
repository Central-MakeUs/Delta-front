"use client";

/**
 * 클라이언트 라우팅 UX용 가드입니다. 토큰은 localStorage 기반이며,
 * 실제 리소스·권한 보호는 서버/API에서 반드시 검증해야 합니다.
 */

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  tokenStorage,
  TOKEN_STORAGE_KEYS,
} from "@/shared/apis/token-storage";
import { platformStorage } from "@/shared/apis/auth/platform-storage";
import { AUTH_SESSION_CHANGED } from "@/shared/apis/auth/auth-events";

const isPublicPath = (pathname: string) =>
  pathname.startsWith("/login") ||
  pathname.startsWith("/oauth") ||
  pathname.startsWith("/error");

export const AuthGuard = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [authTick, setAuthTick] = useState(0);

  useEffect(() => {
    const platform = searchParams.get("platform");
    if (platform) platformStorage.save(platform);
  }, [searchParams]);

  useEffect(() => {
    const bump = () => setAuthTick((n) => n + 1);

    window.addEventListener(AUTH_SESSION_CHANGED, bump);
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === TOKEN_STORAGE_KEYS.access ||
        e.key === TOKEN_STORAGE_KEYS.refresh ||
        e.key === null
      ) {
        bump();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED, bump);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (isPublicPath(pathname)) return;

    const { accessToken, refreshToken } = tokenStorage.getTokens();
    if (!accessToken && !refreshToken) {
      router.replace(platformStorage.getLoginRoute());
    }
  }, [pathname, router, authTick]);

  return null;
};
