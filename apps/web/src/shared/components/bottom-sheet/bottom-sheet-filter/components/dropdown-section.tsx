import React from "react";
import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import type { DropdownSection } from "../types";
import * as styles from "../bottom-sheet-filter.css";

interface DropdownSectionProps {
  chapterLabel: string;
  dropdownSection: DropdownSection;
  isOpen: boolean;
  selectedIds: string[];
  onToggle: (id: string) => void;
  onHeaderClick: () => void;
}

export const FilterDropdownSection = ({
  chapterLabel,
  dropdownSection,
  isOpen,
  selectedIds,
  onToggle,
  onHeaderClick,
}: DropdownSectionProps) => {
  return (
    <div className={styles.dropdownSection}>
      <button
        type="button"
        className={styles.dropdownHeader}
        onClick={onHeaderClick}
      >
        <div className={styles.triangleIcon}>
          <Icon name="triangle" size={1.6} rotate={!isOpen ? 270 : undefined} />
        </div>
        <span className={styles.dropdownTitle}>{chapterLabel}</span>
      </button>
      {isOpen && (
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
      )}
    </div>
  );
};
