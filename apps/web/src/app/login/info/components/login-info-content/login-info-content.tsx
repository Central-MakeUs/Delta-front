"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./login-info-content.css";
import { ROUTES } from "@/shared/constants/routes";
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

export type LoginInfoFormData = {
  name: string;
  birthDate: string;
  profileImage: File | null;
};

const LoginInfoContent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginInfoFormData>({
    name: "",
    birthDate: "",
    profileImage: null,
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false);

  const handleComplete = () => {
    // console.log("Form Data:", formData);
    router.push(ROUTES.HOME);
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
          name={formData.name}
          birthDate={formData.birthDate}
          onNameChange={(value) =>
            setFormData((prev) => ({ ...prev, name: value }))
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
      </div>

      <BottomButtonSection
        onComplete={handleComplete}
        disabled={!formData.name || !formData.birthDate || !isAgreed}
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
