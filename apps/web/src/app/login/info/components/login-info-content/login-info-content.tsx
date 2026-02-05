"use client";

import * as styles from "./login-info-content.css";
import BottomSheetTerms from "@/shared/components/bottom-sheet/bottom-sheet-terms/bottom-sheet-terms";
import {
  ProfileSection,
  FormSection,
  AgreementSection,
  BottomButtonSection,
} from "@/app/login/info/components/sections";
import { useLoginInfoForm } from "../../hooks/use-login-info-form";
import { useOnboardingSubmit } from "../../hooks/use-onboarding-submit";

const TERMS_CONTENT = [
  "여기에 이용약관 내용이 들어갑니다.",
  "개인정보 수집 및 이용에 대한 동의 내용입니다.",
];

const LoginInfoContent = () => {
  const {
    formData,
    isAgreed,
    isTermsSheetOpen,
    updateField,
    setIsAgreed,
    openTermsSheet,
    closeTermsSheet,
    agreeFromTermsSheet,
  } = useLoginInfoForm();

  const { handleComplete, submitError, isButtonDisabled } = useOnboardingSubmit(
    { formData, isAgreed }
  );

  return (
    <main className={styles.page}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          가입을 위한
          <br /> 추가 정보를 입력해주세요.
        </h1>

        <ProfileSection
          profileImage={formData.profileImage}
          onProfileImageChange={(file) => updateField("profileImage", file)}
        />

        <FormSection
          name={formData.nickname}
          birthDate={formData.birthDate}
          onNameChange={(value) => updateField("nickname", value)}
          onBirthDateChange={(value) => updateField("birthDate", value)}
        />

        <AgreementSection
          isAgreed={isAgreed}
          onTermsClick={openTermsSheet}
          onAgreementChange={setIsAgreed}
        />

        {submitError && (
          <p className={styles.errorText} role="alert">
            {submitError}
          </p>
        )}
      </div>

      <BottomButtonSection
        onComplete={handleComplete}
        disabled={isButtonDisabled}
      />

      <BottomSheetTerms
        isOpen={isTermsSheetOpen}
        onClose={closeTermsSheet}
        onAgree={agreeFromTermsSheet}
        termsContent={TERMS_CONTENT}
      />
    </main>
  );
};

export default LoginInfoContent;
