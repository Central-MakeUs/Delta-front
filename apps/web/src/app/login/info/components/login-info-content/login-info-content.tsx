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
} from "../sections";

const termsContent = [
  "여기에 이용약관 내용이 들어갑니다.",
  "개인정보 수집 및 이용에 대한 동의 내용입니다.",
];

export const LoginInfoContent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false);

  const handleComplete = () => {
    // TODO: API 호출하여 정보 저장
    router.push(ROUTES.HOME);
  };

  return (
    <main className={styles.page}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>가입을 위한<br/> 추가 정보를 입력해주세요.</h1>

        <ProfileSection />

        <FormSection
          name={name}
          birthDate={birthDate}
          onNameChange={setName}
          onBirthDateChange={setBirthDate}
        />

        <AgreementSection
          isAgreed={isAgreed}
          onTermsClick={() => setIsTermsSheetOpen(true)}
          onAgreementChange={setIsAgreed}
        />
      </div>

      <BottomButtonSection
        onComplete={handleComplete}
        disabled={!name || !birthDate || !isAgreed}
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
