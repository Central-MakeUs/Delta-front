import React from "react";
import clsx from "clsx";
import * as styles from "./bottom-sheet-filter.css";
import type { BottomSheetFilterProps } from "./types";
import { useBottomSheetFilter } from "./hooks/use-bottom-sheet-filter";
import { FilterHeader } from "./components/filter-header";
import { FilterSection } from "./components/filter-section";
import { FilterFooter } from "./components/filter-footer";

export type {
  FilterOption,
  CheckboxOption,
  DropdownSection,
  BottomSheetFilterProps,
} from "./types";

export const BottomSheetFilter = ({
  isOpen,
  onClose,
  chapterFilters = [],
  typeFilters,
  dropdownSection,
  selectedChapterIds = [],
  selectedTypeIds = [],
  selectedDropdownIds = {},
  onReset,
  onApply,
  className,
  overlayClassName,
}: BottomSheetFilterProps) => {
  const {
    shouldRender,
    isClosing,
    openDropdowns,
    localChapterIds,
    localTypeIds,
    localDropdownIds,
    handleClose,
    handleChapterToggle,
    handleTypeToggle,
    handleDropdownToggle,
    handleDropdownOpenToggle,
    setLocalChapterIds,
    setLocalTypeIds,
    setLocalDropdownIds,
  } = useBottomSheetFilter({
    isOpen,
    onClose,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    dropdownSection,
  });

  if (!shouldRender) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isClosing) {
      handleClose();
    }
  };

  const handleReset = () => {
    setLocalChapterIds([]);
    setLocalTypeIds([]);
    setLocalDropdownIds({});
    onReset?.();
  };

  const handleApply = () => {
    onApply?.({
      chapters: localChapterIds,
      types: localTypeIds,
      dropdown: localDropdownIds,
    });
    handleClose();
  };

  return (
    <div
      className={clsx(
        styles.overlay,
        isClosing && styles.overlayClosing,
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          styles.bottomSheet,
          isClosing && styles.bottomSheetClosing,
          className
        )}
      >
        <div className={styles.frameContainer}>
          <FilterHeader onClose={handleClose} isClosing={isClosing} />

          <div className={styles.contentFrame}>
            <FilterSection
              title="단원별"
              filters={chapterFilters}
              selectedIds={localChapterIds}
              onToggle={handleChapterToggle}
              dropdownSection={dropdownSection}
              openDropdowns={openDropdowns}
              onDropdownToggle={handleDropdownOpenToggle}
              localDropdownIds={localDropdownIds}
              onDropdownOptionToggle={handleDropdownToggle}
            />
            <div className={styles.divider} />
            <FilterSection
              title="유형별"
              filters={typeFilters}
              selectedIds={localTypeIds}
              onToggle={handleTypeToggle}
            />
          </div>

          <FilterFooter
            onReset={handleReset}
            onApply={handleApply}
            isClosing={isClosing}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomSheetFilter;
