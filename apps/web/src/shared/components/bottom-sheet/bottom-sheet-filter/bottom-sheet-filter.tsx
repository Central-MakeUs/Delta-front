"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import Divider from "@/shared/components/divider/divider";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";
import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { FilterHeader } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-header";
import { FilterSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-section";
import { FilterFooter } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-footer";
import { useBottomSheetFilterMotion } from "@/shared/components/bottom-sheet/bottom-sheet-filter/hooks/use-bottom-sheet-filter-motion";
import { useInitialSectionScroll } from "@/shared/components/bottom-sheet/bottom-sheet-filter/hooks/use-initial-section-scroll";
import { useSyncedFilterState } from "@/shared/components/bottom-sheet/bottom-sheet-filter/hooks/use-synced-filter-state";

export type {
  DropdownSection,
  BottomSheetFilterProps,
  BottomSheetFilterInitialSection,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

const CLOSE_ANIMATION_MS = 350;

export const BottomSheetFilter = ({
  isOpen,
  onClose,
  chapterFilters = [],
  typeFilters = [],
  dropdownSection,
  selectedChapterIds = [],
  selectedTypeIds = [],
  selectedDropdownIds = {},
  onReset,
  onApply,
  className,
  overlayClassName,
  initialSection = "chapter",
}: BottomSheetFilterProps) => {
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSyncTimer = () => {
    if (!syncTimerRef.current) return;
    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = null;
  };

  const {
    isClosing,
    requestClose,
    motionState,
    handleOverlayClick,
    handleSheetAnimationEnd,
  } = useBottomSheetFilterMotion({
    isOpen,
    onClose,
    closeAnimationMs: CLOSE_ANIMATION_MS,
  });

  const {
    localChapterIds,
    setLocalChapterIds,
    localTypeIds,
    setLocalTypeIds,
    localDropdownIds,
    setLocalDropdownIds,
    syncFromLatest,
  } = useSyncedFilterState({
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
  });

  const {
    contentFrameRef,
    chapterAnchorRef,
    typeAnchorRef,
    bottomSpacerHeightRem,
    syncSpacerForSection,
    scrollToInitialSection,
  } = useInitialSectionScroll();

  useEffect(() => {
    if (!isOpen) return;

    clearSyncTimer();
    syncTimerRef.current = setTimeout(() => {
      syncFromLatest();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          syncSpacerForSection(initialSection);
          requestAnimationFrame(() => {
            scrollToInitialSection(initialSection);
          });
        });
      });
    }, 0);

    return () => {
      clearSyncTimer();
    };
  }, [
    isOpen,
    initialSection,
    syncFromLatest,
    syncSpacerForSection,
    scrollToInitialSection,
  ]);

  const shouldRender = isOpen || isClosing;
  if (!shouldRender) return null;

  const handleChapterToggle = (id: string) => {
    setLocalChapterIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleTypeToggle = (id: string) => {
    setLocalTypeIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleDropdownToggle = (chapterId: string, optionId: string) => {
    setLocalDropdownIds((prev) => {
      const cur = prev[chapterId] ?? [];
      const next = cur.includes(optionId)
        ? cur.filter((v) => v !== optionId)
        : [...cur, optionId];
      return { ...prev, [chapterId]: next };
    });
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
    requestClose();
  };

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      data-state={motionState}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="필터"
    >
      <div
        className={clsx(styles.bottomSheet, className)}
        data-state={motionState}
        onAnimationEnd={handleSheetAnimationEnd}
      >
        <div className={styles.frameContainer}>
          <FilterHeader onClose={requestClose} isClosing={isClosing} />

          <div className={styles.contentFrame} ref={contentFrameRef}>
            <div ref={chapterAnchorRef}>
              <FilterSection
                title="단원별"
                filters={chapterFilters}
                selectedIds={localChapterIds}
                onToggle={handleChapterToggle}
                dropdownSection={dropdownSection}
                localDropdownIds={localDropdownIds}
                onDropdownOptionToggle={handleDropdownToggle}
              />
            </div>

            <div ref={typeAnchorRef}>
              <Divider className={styles.dividerStyle} />
              <FilterSection
                title="유형별"
                filters={typeFilters}
                selectedIds={localTypeIds}
                onToggle={handleTypeToggle}
              />
            </div>

            <div
              aria-hidden
              style={{
                height: `${bottomSpacerHeightRem}rem`,
                flexShrink: 0,
                width: "100%",
              }}
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
