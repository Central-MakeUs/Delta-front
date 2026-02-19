"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { setAuthFresh } from "@/shared/apis/auth/auth-events";
import { ROUTES } from "@/shared/constants/routes";
import { userApi } from "@/shared/apis/user/user-api";
import { useUploadMyProfileImageMutation } from "@/shared/apis/profile-image/hooks/use-upload-my-profile-image-mutation";
import type { LoginInfoFormData } from "./use-login-info-form";

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
  const uploadProfileImage = useUploadMyProfileImageMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = Boolean(formData.nickname.trim()) && isAgreed;

  const handleComplete = useCallback(async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await userApi.onboarding({
        nickname: formData.nickname.trim(),
        termsAgreed: true,
      } as Parameters<typeof userApi.onboarding>[0]);

      if (formData.profileImage) {
        await uploadProfileImage.mutateAsync(formData.profileImage);
      }

      setAuthFresh();
      router.replace(ROUTES.HOME);
    } catch (e: unknown) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[login-info] onboarding failed", e);
      }
      setSubmitError(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    canSubmit,
    isSubmitting,
    formData.nickname,
    formData.profileImage,
    router,
    uploadProfileImage,
  ]);

  const isButtonDisabled =
    !canSubmit || isSubmitting || uploadProfileImage.isPending;

  return {
    handleComplete,
    isSubmitting,
    submitError,
    isButtonDisabled,
  };
};
