"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ErrorPageContent } from "@/app/error/error-page-content";
import { ApiError } from "@/shared/apis/api-error";
import {
  ERROR_CODE_INFO,
  type ErrorCodeValue,
} from "@/shared/apis/error-codes";
import { ROUTES, type ErrorType } from "@/shared/constants/routes";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const getStatus = (error: Error): number | undefined => {
  if (error instanceof ApiError) {
    const byCode =
      error.code in ERROR_CODE_INFO
        ? ERROR_CODE_INFO[error.code as ErrorCodeValue]?.status
        : undefined;
    return error.status ?? byCode;
  }
  const status = (error as ApiError & { status?: number }).status;
  return status;
};

const getErrorType = (status: number | undefined): ErrorType => {
  if (status === 404) return "404";
  if (status !== undefined && status >= 500) return "500";
  return "500";
};

const ErrorBoundary = ({ error }: ErrorPageProps) => {
  const router = useRouter();
  const status = getStatus(error);
  const errorType = getErrorType(status);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught an error:", error);
    }

    if (status === 401 || status === 403) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }
    if (status !== undefined && status >= 500) {
      router.replace(`${ROUTES.ERROR.ROOT}?type=500`);
      return;
    }
  }, [error, status, router]);

  if (status === 401 || status === 403) return null;

  return <ErrorPageContent errorType={errorType} />;
};

export default ErrorBoundary;
