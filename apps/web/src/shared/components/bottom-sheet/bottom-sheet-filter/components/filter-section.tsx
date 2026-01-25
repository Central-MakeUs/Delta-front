import Chip from "@/shared/components/chip/chip";
import type { FilterOption } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { FilterSelectSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/dropdown-section";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";
import { CHAPTER_DROPDOWN_OPTIONS } from "@/app/wrong/(list)/constants/wrong-filters";

interface FilterSectionProps {
  title: string;
  filters: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  localDropdownIds?: Record<string, string[]>;
  onDropdownOptionToggle?: (chapterId: string, optionId: string) => void;
}

export const FilterSection = ({
  title,
  filters,
  selectedIds,
  onToggle,
  localDropdownIds,
  onDropdownOptionToggle,
}: FilterSectionProps) => {
  const canShowDropdown = !!localDropdownIds && !!onDropdownOptionToggle;

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
        const unitOptions = CHAPTER_DROPDOWN_OPTIONS[chapterId] ?? [];

        return (
          <FilterSelectSection
            key={chapterId}
            chapterLabel={chapter.label}
            dropdownSection={{
              id: chapterId,
              options: unitOptions,
              defaultOpen: true,
            }}
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
