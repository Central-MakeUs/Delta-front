export type FilterOption = {
  id: string;
  label: string;
};

export type CheckboxOption = {
  id: string;
  label: string;
};

export type DropdownSection = {
  id: string;
  options: CheckboxOption[];
  defaultOpen?: boolean;
};

export interface BottomSheetFilterProps {
  isOpen: boolean;
  onClose: () => void;
  chapterFilters: FilterOption[];
  typeFilters: FilterOption[];
  dropdownSection?: DropdownSection;
  selectedChapterIds?: string[];
  selectedTypeIds?: string[];
  selectedDropdownIds?: Record<string, string[]>;
  onReset?: () => void;
  onApply?: (filters: {
    chapters: string[];
    types: string[];
    dropdown: Record<string, string[]>;
  }) => void;
  className?: string;
  overlayClassName?: string;
}
