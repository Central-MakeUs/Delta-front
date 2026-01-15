import * as styles from "./bottom-button.css";
import { Button } from "@/shared/components/button/button/button";

interface BottomButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isCompleted: boolean;
}

const BottomButton = ({
  onClick,
  disabled = false,
  isCompleted,
}: BottomButtonProps) => {
  return (
    <div className={styles.bottomButtonContainer}>
      {isCompleted ? (
        <div className={styles.bottomButtonWrapper}>
          <Button
            fullWidth
            onClick={onClick}
            disabled={disabled}
            tone="default"
            label="이미 완료한 오답이에요"
            size="48"
            icon="check-mark"
            iconSize={2.4}
          />
        </div>
      ) : (
        <div className={styles.bottomButtonWrapper}>
          <Button
            fullWidth
            onClick={onClick}
            tone="complete"
            label="오답 완료"
            size="48"
            icon="check-mark"
            iconSize={2.4}
          />
        </div>
      )}
    </div>
  );
};

export default BottomButton;
