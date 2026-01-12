"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Divider from "../../divider/divider";
import * as styles from "./bottom-sheet-filter.css";
import type { BottomSheetFilterProps } from "./types";
import { FilterHeader } from "./components/filter-header";
import { FilterSection } from "./components/filter-section";
import { FilterFooter } from "./components/filter-footer";
import { slideDown } from "../styles/animations.css";

export type { DropdownSection, BottomSheetFilterProps } from "./types";

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

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [localChapterIds, setLocalChapterIds] =
    useState<string[]>(selectedChapterIds);
  const [localTypeIds, setLocalTypeIds] = useState<string[]>(selectedTypeIds);
  const [localDropdownIds, setLocalDropdownIds] = useState<
    Record<string, string[]>
  >(() => normalizeDropdownIds(selectedDropdownIds));

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (isClosing) return;
    requestClose();
  };

  const handleSheetAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (!isClosing) return;
    if (e.target !== e.currentTarget) return;

    if (e.animationName !== slideDown) return;

    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isClosing) return;
      requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

  if (!isOpen) return null;

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

  const handleDropdownOpenToggle = (chapterId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleReset = () => {
    setLocalChapterIds([]);
    setLocalTypeIds([]);
    setLocalDropdownIds({});
    setOpenDropdowns({});
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
              openDropdowns={openDropdowns}
              onDropdownToggle={handleDropdownOpenToggle}
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
