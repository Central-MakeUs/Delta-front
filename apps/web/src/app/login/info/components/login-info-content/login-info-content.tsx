"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./login-info-content.css";
import { ROUTES } from "@/shared/constants/routes";
import { userApi } from "@/shared/apis/user/user-api";
import BottomSheetTerms from "@/shared/components/bottom-sheet/bottom-sheet-terms/bottom-sheet-terms";
import {
  ProfileSection,
  FormSection,
  AgreementSection,
  BottomButtonSection,
} from "@/app/login/info/components/sections";

const termsContent = [
  "여기에 이용약관 내용이 들어갑니다.",
  "개인정보 수집 및 이용에 대한 동의 내용입니다.",
];

/** 폼 birthDate (YYYY/MM/DD) → API birthDate (YYYY-MM-DD) */
const toApiBirthDate = (value: string): string => {
  if (!value.trim()) return "";
  return value.trim().replace(/\//g, "-");
};

export type LoginInfoFormData = {
  nickname: string;
  birthDate: string;
  profileImage: File | null;
};

const LoginInfoContent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginInfoFormData>({
    nickname: "",
    birthDate: "",
    profileImage: null,
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleComplete = async () => {
    const birthDateApi = toApiBirthDate(formData.birthDate);
    if (!formData.nickname.trim() || !birthDateApi || !isAgreed) {
      return;
    }

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
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message: unknown }).message)
          : "저장에 실패했어요. 다시 시도해 주세요.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          가입을 위한
          <br /> 추가 정보를 입력해주세요.
        </h1>

        <ProfileSection
          profileImage={formData.profileImage}
          onProfileImageChange={(file) =>
            setFormData((prev) => ({ ...prev, profileImage: file }))
          }
        />

        <FormSection
          name={formData.nickname}
          birthDate={formData.birthDate}
          onNameChange={(value) =>
            setFormData((prev) => ({ ...prev, nickname: value }))
          }
          onBirthDateChange={(value) =>
            setFormData((prev) => ({ ...prev, birthDate: value }))
          }
        />

        <AgreementSection
          isAgreed={isAgreed}
          onTermsClick={() => setIsTermsSheetOpen(true)}
          onAgreementChange={setIsAgreed}
        />

        {submitError ? (
          <p className={styles.errorText} role="alert">
            {submitError}
          </p>
        ) : null}
      </div>

      <BottomButtonSection
        onComplete={handleComplete}
        disabled={
          !formData.nickname.trim() ||
          !formData.birthDate.trim() ||
          !isAgreed ||
          isSubmitting
        }
      />

      <BottomSheetTerms
        isOpen={isTermsSheetOpen}
        onClose={() => setIsTermsSheetOpen(false)}
        onAgree={() => setIsAgreed(true)}
        termsContent={termsContent}
      />
    </main>
  );
};

export default LoginInfoContent;
