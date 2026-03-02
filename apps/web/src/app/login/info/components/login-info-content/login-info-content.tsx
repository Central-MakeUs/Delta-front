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
import { useMyProfileQuery } from "@/shared/apis/user/hooks/use-my-profile-query";

const TERMS_CONTENT = [
  "■ 개인정보 처리방침 (세모 / SEMO)",

  "1. 개인정보의 처리 목적",
  "델타(https://semo-xi.vercel.app/ 이하 '세모')은(는) 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.",
  "고객 가입의사 확인, 고객에 대한 서비스 제공(AI 수학 풀이 분석 및 학습 리포트 제공 등)에 따른 본인 식별·인증, 회원자격 유지·관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급·배송 등",

  "2. 개인정보의 처리 및 보유 기간",
  "델타(https://semo-xi.vercel.app/ 이하 '세모')는 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.",
  "· 고객 가입 및 관리: 서비스 이용계약 또는 회원가입 해지 시까지. 다만 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지",
  "· 전자상거래에서의 계약·청약철회, 대금결제, 재화 등 공급기록: 5년",

  "3. 개인정보의 제3자 제공",
  "· 개인정보를 제공받는 자: 세모(SEMO) 앱을 이용하는 모든 사용자",
  "· 제공받는 자의 개인정보 이용목적: 서비스 이용",
  "· 제공하는 개인정보 항목: 이메일, 비밀번호",
  "· 제공받는 자의 보유·이용기간: 회원탈퇴 전까지",

  "4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법",
  "정보주체는 델타(https://semo-xi.vercel.app/ 이하 '세모')에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.",
  "· 개인정보 열람요구  · 오류 등이 있을 경우 정정 요구  · 삭제요구  · 처리정지 요구",

  "5. 개인정보 수집 항목",
  "· 개인정보 수집용도: 서비스 이용",
  "· 필수항목: 카카오계정(이메일), 성별, 생일, 출생 연도, 카카오계정(이름), 애플계정(이메일), 애플계정(이름)",

  "6. 개인정보의 파기",
  "· 파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다. DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.",
  "· 파기기한: 이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 7일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 처리가 불필요한 것으로 인정되는 날로부터 7일 이내에 파기합니다.",

  "7. 개인정보 보호책임자",
  "· 성명: 유용준  · 직책: 대표  · 전화번호: +82-10-7120-6289  · 이메일: dkfdirvkdnj@gmil.com",

  "8. 개인정보 처리방침 변경",
  "이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.",

  "9. 개인정보의 안전성 확보조치",
  "· 관리적 보호조치: 정기적인 자체 감사 실시",
  "· 기술적 보호조치: 개인정보에 대한 접근 제한",
  "· 물리적 보호조치: 비인가자에 대한 출입 통제",
];

const LoginInfoContent = () => {
  const { data: profile } = useMyProfileQuery();

  const initialNickname = profile?.nickname ?? "";

  const {
    formData,
    isAgreed,
    isTermsSheetOpen,
    updateField,
    setIsAgreed,
    openTermsSheet,
    closeTermsSheet,
    agreeFromTermsSheet,
  } = useLoginInfoForm({ initialNickname });

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
          onNameChange={(value) => updateField("nickname", value)}
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
