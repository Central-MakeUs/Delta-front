import { Button } from "@/shared/components/button/button/button";
import * as styles from "../bottom-sheet-filter.css";

interface FilterFooterProps {
  onReset: () => void;
  onApply: () => void;
  isClosing: boolean;
}

export const FilterFooter = ({
  onReset,
  onApply,
  isClosing,
}: FilterFooterProps) => {
  return (
    <div className={styles.buttonContainer}>
      <Button
        label="초기화"
        size="48"
        tone="default"
        icon="reset"
        iconSize={2.4}
        onClick={onReset}
        disabled={isClosing}
        className={styles.resetButtonOverride}
      />
      <Button
        label="적용하기"
        size="48"
        tone="dark"
        onClick={onApply}
        disabled={isClosing}
        className={styles.applyButtonOverride}
      />
    </div>
  );
};
