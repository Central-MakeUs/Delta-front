import Chip from "@/shared/components/chip/chip";
import type { FilterOption, DropdownSection } from "../types";
import { FilterDropdownSection } from "./dropdown-section";
import * as styles from "../bottom-sheet-filter.css";

interface FilterSectionProps {
  title: string;
  filters: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  dropdownSection?: DropdownSection;
  openDropdowns?: Record<string, boolean>;
  onDropdownToggle?: (chapterId: string) => void;
  localDropdownIds?: Record<string, string[]>;
  onDropdownOptionToggle?: (chapterId: string, optionId: string) => void;
}

export const FilterSection = ({
  title,
  filters,
  selectedIds,
  onToggle,
  dropdownSection,
  openDropdowns,
  onDropdownToggle,
  localDropdownIds,
  onDropdownOptionToggle,
}: FilterSectionProps) => {
  return (
    <div className={styles.sectionFrame}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.chipContainer}>
        {filters.map((filter) => {
          const isSelected = selectedIds.includes(filter.id);
          return (
            <Chip
              key={filter.id}
              type="button"
              shape="square"
              label={filter.label}
              state={isSelected ? "active" : undefined}
              onClick={() => onToggle(filter.id)}
            />
          );
        })}
      </div>
      {dropdownSection &&
        openDropdowns &&
        onDropdownToggle &&
        localDropdownIds &&
        onDropdownOptionToggle &&
        filters
          .filter((filter) => selectedIds.includes(filter.id))
          .map((chapterFilter) => {
            const chapterId = chapterFilter.id;
            const isDropdownOpen = openDropdowns[chapterId] ?? false;
            const chapterSelectedIds = localDropdownIds?.[chapterId] || [];

            return (
              <FilterDropdownSection
                key={chapterId}
                chapterLabel={chapterFilter.label}
                dropdownSection={dropdownSection}
                isOpen={isDropdownOpen}
                selectedIds={chapterSelectedIds}
                onToggle={(optionId) =>
                  onDropdownOptionToggle?.(chapterId, optionId)
                }
                onHeaderClick={() => onDropdownToggle?.(chapterId)}
              />
            );
          })}
    </div>
  );
};
