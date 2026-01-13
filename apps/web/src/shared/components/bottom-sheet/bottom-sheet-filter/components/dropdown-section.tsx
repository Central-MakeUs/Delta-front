import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import type { DropdownSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";

interface FilterDropdownSectionProps {
  chapterLabel: string;
  dropdownSection: DropdownSection;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const FilterDropdownSection = ({
  chapterLabel,
  dropdownSection,
  selectedIds,
  onToggle,
}: FilterDropdownSectionProps) => {
  return (
    <div className={styles.dropdownSection}>
      <div className={styles.dropdownHeader}>
        <div className={styles.triangleIcon}>
          <Icon name="triangle" size={1.6} />
        </div>
        <span className={styles.dropdownTitle}>{chapterLabel}</span>
      </div>

      <div className={styles.checkboxList}>
        {dropdownSection.options.map((option) => {
          const isChecked = selectedIds.includes(option.id);
          return (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={isChecked}
              onChange={() => onToggle(option.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
