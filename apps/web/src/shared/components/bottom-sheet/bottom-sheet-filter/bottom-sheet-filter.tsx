"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Divider from "@/shared/components/divider/divider";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter.css";
import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { FilterHeader } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-header";
import { FilterSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-section";
import { FilterFooter } from "@/shared/components/bottom-sheet/bottom-sheet-filter/components/filter-footer";

export type {
  DropdownSection,
  BottomSheetFilterProps,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

const CLOSE_ANIMATION_MS = 350;

const normalizeDropdownIds = (
  input: BottomSheetFilterProps["selectedDropdownIds"]
) => {
  const out: Record<string, string[]> = {};
  if (!input) return out;

  Object.entries(input).forEach(([k, v]) => {
    if (Array.isArray(v)) out[k] = [...v];
    else if (typeof v === "string") out[k] = [v];
  });

  return out;
};

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
  const [isClosing, setIsClosing] = useState(false);

  const [localChapterIds, setLocalChapterIds] =
    useState<string[]>(selectedChapterIds);
  const [localTypeIds, setLocalTypeIds] = useState<string[]>(selectedTypeIds);
  const [localDropdownIds, setLocalDropdownIds] = useState<
    Record<string, string[]>
  >(() => normalizeDropdownIds(selectedDropdownIds));

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestSelectedChapterIdsRef = useRef(selectedChapterIds);
  const latestSelectedTypeIdsRef = useRef(selectedTypeIds);
  const latestSelectedDropdownIdsRef = useRef(selectedDropdownIds);

  useEffect(() => {
    latestSelectedChapterIdsRef.current = selectedChapterIds;
    latestSelectedTypeIdsRef.current = selectedTypeIds;
    latestSelectedDropdownIdsRef.current = selectedDropdownIds;
  }, [selectedChapterIds, selectedTypeIds, selectedDropdownIds]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const clearSyncTimer = () => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
  };

  const finalizeClose = () => {
    clearCloseTimer();
    setIsClosing(false);
    onClose();
  };

  const requestClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      finalizeClose();
    }, CLOSE_ANIMATION_MS + 50);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (isClosing) return;
    requestClose();
  };

  const handleSheetAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (!isClosing) return;
    if (e.target !== e.currentTarget) return;
    finalizeClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    clearCloseTimer();
    clearSyncTimer();

    syncTimerRef.current = setTimeout(() => {
      setIsClosing(false);

      setLocalChapterIds(latestSelectedChapterIdsRef.current);
      setLocalTypeIds(latestSelectedTypeIdsRef.current);
      setLocalDropdownIds(
        normalizeDropdownIds(latestSelectedDropdownIdsRef.current)
      );
    }, 0);

    return () => {
      clearSyncTimer();
    };
  }, [isOpen]);

  useEffect(() => {
    const shouldLock = isOpen || isClosing;
    if (!shouldLock) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    const shouldBind = isOpen || isClosing;
    if (!shouldBind) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isClosing) return;
      requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

  const shouldRender = isOpen || isClosing;
  if (!shouldRender) return null;

  const motionState = isClosing ? "closing" : "open";

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

          <div className={styles.contentFrame}>
            <FilterSection
              title="단원별"
              filters={chapterFilters}
              selectedIds={localChapterIds}
              onToggle={handleChapterToggle}
              dropdownSection={dropdownSection}
              localDropdownIds={localDropdownIds}
              onDropdownOptionToggle={handleDropdownToggle}
            />

            <Divider />

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
