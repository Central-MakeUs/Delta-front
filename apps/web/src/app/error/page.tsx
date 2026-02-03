"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorPageContent } from "@/app/error/error-page-content";

type ErrorType = "401" | "404" | "500";

const ErrorPageContentWrapper = () => {
  const searchParams = useSearchParams();
  const errorType = (searchParams.get("type") || "500") as ErrorType;

  return <ErrorPageContent errorType={errorType} />;
};

const ErrorPage = () => {
  return (
    <Suspense fallback={<ErrorPageContent errorType="500" />}>
      <ErrorPageContentWrapper />
    </Suspense>
  );
};

export default ErrorPage;
