import Chip from "@/shared/components/chip/chip";
import type {
  FilterOption,
  DropdownSection,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { FilterDropdownSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/dropdown-section";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";

interface FilterSectionProps {
  title: string;
  filters: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  dropdownSection?: DropdownSection;
  localDropdownIds?: Record<string, string[]>;
  onDropdownOptionToggle?: (chapterId: string, optionId: string) => void;
}

export const FilterSection = ({
  title,
  filters,
  selectedIds,
  onToggle,
  dropdownSection,
  localDropdownIds,
  onDropdownOptionToggle,
}: FilterSectionProps) => {
  const canShowDropdown =
    !!dropdownSection && !!localDropdownIds && !!onDropdownOptionToggle;

  const selectedChapters = canShowDropdown
    ? filters.filter((f) => selectedIds.includes(f.id))
    : [];

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

      {selectedChapters.map((chapter) => {
        const chapterId = chapter.id;
        const chapterSelectedIds = localDropdownIds?.[chapterId] ?? [];

        return (
          <FilterDropdownSection
            key={chapterId}
            chapterLabel={chapter.label}
            dropdownSection={dropdownSection!}
            selectedIds={chapterSelectedIds}
            onToggle={(optionId) =>
              onDropdownOptionToggle!(chapterId, optionId)
            }
          />
        );
      })}
    </div>
  );
};
