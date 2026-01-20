import { Checkbox } from "@/shared/components/checkbox/checkbox";
import * as styles from "./agreement-section.css";

interface AgreementSectionProps {
  isAgreed: boolean;
  onTermsClick: () => void;
  onAgreementChange: (checked: boolean) => void;
}

const AgreementSection = ({
  isAgreed,
  onTermsClick,
  onAgreementChange,
}: AgreementSectionProps) => {
  const handleChange = () => {
    if (isAgreed) {
      onAgreementChange(false);
    } else {
      onTermsClick();
    }
  };

  return (
    <div className={styles.checkboxSection}>
      <Checkbox
        className={styles.checkboxWrapper}
        size="medium"
        checked={isAgreed}
        onChange={handleChange}
        label="개인정보 약관 동의하러 가기"
      />
    </div>
  );
};

export default AgreementSection;
