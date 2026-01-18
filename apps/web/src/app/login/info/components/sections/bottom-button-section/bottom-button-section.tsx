import { Button } from "@/shared/components/button/button/button";
import * as styles from "./bottom-button-section.css";

interface BottomButtonSectionProps {
  onComplete: () => void;
  disabled?: boolean;
}

const BottomButtonSection = ({ onComplete, disabled }: BottomButtonSectionProps) => {
  return (
    <div className={styles.bottomButtonContainer}>
      <div className={styles.bottomButtonWrapper}>
        <Button
          fullWidth
          onClick={onComplete}
          tone="dark"
          label="다음"
          size="48"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default BottomButtonSection;
