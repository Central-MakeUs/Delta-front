import Icon from "@/shared/components/icon/icon";
import * as styles from "./bottom-button.css";

interface BottomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const BottomButton = ({ onClick, disabled = false }: BottomButtonProps) => {
  return (
    <div className={styles.bottomButtonContainer}>
      <div className={styles.bottomButtonWrapper}>
        <button
          type="button"
          className={styles.bottomButton}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon name="check-mark" size={2.4} />
          오답 완료
        </button>
      </div>
    </div>
  );
};

export default BottomButton;
