"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { userApi } from "@/shared/apis/user/user-api";
import type { LoginInfoFormData } from "./use-login-info-form";

/** 폼 birthDate (YYYY/MM/DD) → API birthDate (YYYY-MM-DD) */
const toApiBirthDate = (value: string): string => {
  if (!value.trim()) return "";
  return value.trim().replace(/\//g, "-");
};

const getErrorMessage = (e: unknown): string => {
  if (e && typeof e === "object" && "message" in e) {
    return String((e as { message: unknown }).message);
  }
  return "저장에 실패했어요. 다시 시도해 주세요.";
};

type Params = {
  formData: LoginInfoFormData;
  isAgreed: boolean;
};

export const useOnboardingSubmit = ({ formData, isAgreed }: Params) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const birthDateApi = toApiBirthDate(formData.birthDate);
  const canSubmit =
    Boolean(formData.nickname.trim()) && Boolean(birthDateApi) && isAgreed;

  const handleComplete = useCallback(async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await userApi.onboarding({
        nickname: formData.nickname.trim(),
        birthDate: birthDateApi,
        termsAgreed: true,
      });
      router.replace(ROUTES.HOME);
    } catch (e: unknown) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[login-info] onboarding failed", e);
      }
      setSubmitError(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, isSubmitting, formData.nickname, birthDateApi, router]);

  const isButtonDisabled = !canSubmit || isSubmitting;

  return {
    handleComplete,
    isSubmitting,
    submitError,
    isButtonDisabled,
  };
};
