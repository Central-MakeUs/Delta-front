"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ErrorPageContent } from "@/app/error/error-page-content";
import type { ApiError } from "@/shared/apis/api-error";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorBoundary = ({ error }: ErrorPageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught an error:", error);
    }

    const status =
      (error as ApiError).status || (error as { status?: number }).status;

    if (status === 401) {
      router.replace("/error?type=401");
    } else if (status && status >= 500) {
      router.replace("/error?type=500");
    }
  }, [error, router]);

  const status =
    (error as ApiError).status || (error as { status?: number }).status;

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
