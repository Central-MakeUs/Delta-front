"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { tokenStorage } from "@/shared/apis/token-storage";
import { platformStorage } from "@/shared/apis/auth/platform-storage";

const isPublicPath = (pathname: string) =>
  pathname.startsWith("/login") ||
  pathname.startsWith("/oauth") ||
  pathname.startsWith("/error");

export const AuthGuard = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const platform = searchParams.get("platform");
    if (platform) platformStorage.save(platform);
  }, [searchParams]);

  useEffect(() => {
    if (isPublicPath(pathname)) return;

    const { accessToken, refreshToken } = tokenStorage.getTokens();
    if (!accessToken && !refreshToken) {
      router.replace(platformStorage.getLoginRoute());
    }
  }, [pathname, router]);

  return null;
};
