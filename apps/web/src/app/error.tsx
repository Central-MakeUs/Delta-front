"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ErrorPageContent } from "@/app/error/error-page-content";
import type { ApiError } from "@/shared/apis/api-error";
import { ROUTES } from "@/shared/constants/routes";
import { toastError } from "@/shared/components/toast/toast";

type ErrorPageProps = {
  error: Error & { digest?: string };
};

const isInAuthFlow = (pathname: string | null): boolean => {
  if (!pathname) return false;
  if (pathname === ROUTES.AUTH.LOGIN) return true;
  if (pathname.startsWith(ROUTES.AUTH.SIGNUP_INFO)) return true;
  if (pathname.startsWith("/oauth")) return true;
  return false;
};

const ErrorBoundary = ({ error }: ErrorPageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const status =
    (error as ApiError).status || (error as { status?: number }).status;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught an error:", error);
    }

    if (status === 401) {
      if (!isInAuthFlow(pathname)) {
        toastError("로그인이 만료됐어요.");
      }
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [error, pathname, router, status]);

  let errorType: "401" | "404" | "500" = "500";
  if (status === 401) {
    errorType = "401";
  } else if (status === 404) {
    errorType = "404";
  } else if (status && status >= 500) {
    errorType = "500";
  }

  return <ErrorPageContent errorType={errorType} />;
};

export default ErrorBoundary;
