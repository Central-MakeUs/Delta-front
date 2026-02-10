import Icon from "@/shared/components/icon/icon";
import Chip from "@/shared/components/chip/chip";
import type { DropdownSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";

interface FilterSelectSectionProps {
  chapterLabel: string;
  dropdownSection: DropdownSection;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const FilterSelectSection = ({
  chapterLabel,
  dropdownSection,
  selectedIds,
  onToggle,
}: FilterSelectSectionProps) => {
  return (
    <div className={styles.dropdownSection}>
      <div className={styles.dropdownHeader}>
        <div className={styles.triangleIcon}>
          <Icon name="triangle" size={1.6} />
        </div>
        <span className={styles.dropdownTitle}>{chapterLabel}</span>
      </div>

      <div className={styles.chipContainer}>
        {dropdownSection.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <Chip
              key={option.id}
              label={option.label}
              size="lg"
              shape="square"
              state={isSelected ? "active" : "default"}
              onClick={() => onToggle(option.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
