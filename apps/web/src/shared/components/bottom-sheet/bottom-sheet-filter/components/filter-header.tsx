import Icon from "@/shared/components/icon/icon";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";

interface FilterHeaderProps {
  onClose: () => void;
  isClosing: boolean;
}

export const FilterHeader = ({ onClose, isClosing }: FilterHeaderProps) => {
  return (
    <div className={styles.headerFrame}>
      <div className={styles.headerContent}>
        <h2 className={styles.title}>필터</h2>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          disabled={isClosing}
          aria-label="닫기"
        >
          <Icon name="multiple" size={2.4} />
        </button>
      </div>
    </div>
  );
};
