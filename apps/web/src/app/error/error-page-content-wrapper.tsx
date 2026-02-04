"use client";

import { useSearchParams } from "next/navigation";
import { ErrorPageContent } from "./error-page-content";
import { type ErrorType } from "@/shared/constants/routes";

const VALID_ERROR_TYPES: ErrorType[] = ["401", "404", "500"];

const isValidErrorType = (value: string | null): value is ErrorType =>
  value !== null && VALID_ERROR_TYPES.includes(value as ErrorType);

export const ErrorPageContentWrapper = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const errorType: ErrorType = isValidErrorType(type) ? type : "500";

  return <ErrorPageContent errorType={errorType} />;
};
