import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import Checkbox from "@/shared/components/checkbox/checkbox";
import * as styles from "./bottom-sheet-filter.css";
import Chip from "../../chip/chip";
import Icon from "../../icon/icon";

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
  title: string;
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
  selectedDropdownIds?: string[];
  onReset?: () => void;
  onApply?: (filters: {
    chapters: string[];
    types: string[];
    dropdown: string[];
  }) => void;
  className?: string;
  overlayClassName?: string;
}

const ANIMATION_DURATION = 300;

export const BottomSheetFilter = ({
  isOpen,
  onClose,
  chapterFilters,
  typeFilters,
  dropdownSection,
  selectedChapterIds = [],
  selectedTypeIds = [],
  selectedDropdownIds = [],
  onReset,
  onApply,
  className,
  overlayClassName,
}: BottomSheetFilterProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [localChapterIds, setLocalChapterIds] = useState(selectedChapterIds);
  const [localTypeIds, setLocalTypeIds] = useState(selectedTypeIds);
  const [localDropdownIds, setLocalDropdownIds] = useState(selectedDropdownIds);

  const prevIsOpenRef = useRef(isOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    const prevIsOpen = prevIsOpenRef.current;

    if (isOpen !== prevIsOpen) {
      if (isOpen && !prevIsOpen) {
        requestAnimationFrame(() => {
          setLocalChapterIds(selectedChapterIds);
          setLocalTypeIds(selectedTypeIds);
          setLocalDropdownIds(selectedDropdownIds);
          setOpenDropdowns({});
        });
      }
      prevIsOpenRef.current = isOpen;

      if (isOpen) {
        setIsClosing((prev) => {
          if (prev) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
          return false;
        });
      } else {
        setIsClosing((prev) => (prev ? prev : true));
      }
    }
  }, [
    isOpen,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    dropdownSection?.defaultOpen,
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    if (isClosing) {
      timeoutRef.current = setTimeout(() => {
        setIsClosing(false);
        document.body.style.overflow = "unset";
      }, ANIMATION_DURATION);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }

    return () => {
      if (!isOpen && !isClosing) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isClosing) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isClosing, onClose]);

  if (!shouldRender) return null;

  const handleClose = () => {
    if (isClosing) return;
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isClosing) {
      handleClose();
    }
  };

  const handleChapterToggle = (id: string) => {
    setLocalChapterIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleTypeToggle = (id: string) => {
    setLocalTypeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDropdownToggle = (id: string) => {
    setLocalDropdownIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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
    setLocalDropdownIds([]);
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
    >
      <div
        className={clsx(
          styles.bottomSheet,
          isClosing && styles.bottomSheetClosing,
          className
        )}
      >
        <div className={styles.frameContainer}>
          <div className={styles.headerFrame}>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>필터</h2>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                disabled={isClosing}
                aria-label="닫기"
              >
                <Icon name="multiple" size={2.4} />
              </button>
            </div>
          </div>

          <div className={styles.contentFrame}>
            <div className={styles.sectionFrame}>
              <h3 className={styles.sectionTitle}>단원별</h3>
              <div className={styles.chipContainer}>
                {chapterFilters.map((filter) => {
                  const isSelected = localChapterIds.includes(filter.id);
                  return (
                    <Chip
                      key={filter.id}
                      type="button"
                      shape="square"
                      label={filter.label}
                      state={isSelected ? "active" : undefined}
                      onClick={() => handleChapterToggle(filter.id)}
                    />
                  );
                })}
              </div>
              {dropdownSection &&
                localChapterIds.map((chapterId) => {
                  const chapterFilter = chapterFilters.find(
                    (f) => f.id === chapterId
                  );
                  if (!chapterFilter) return null;

                  const isDropdownOpen = openDropdowns[chapterId] ?? false;

                  return (
                    <div key={chapterId} className={styles.dropdownSection}>
                      <button
                        type="button"
                        className={styles.dropdownHeader}
                        onClick={() => handleDropdownOpenToggle(chapterId)}
                      >
                        <div className={styles.triangleIcon}>
                          <Icon
                            name="triangle"
                            size={1.6}
                            rotate={!isDropdownOpen ? 270 : undefined}
                          />
                        </div>
                        <span className={styles.dropdownTitle}>
                          {chapterFilter.label}
                        </span>
                      </button>
                      {isDropdownOpen && (
                        <div className={styles.checkboxList}>
                          {dropdownSection.options.map((option) => {
                            const isChecked = localDropdownIds.includes(
                              option.id
                            );
                            return (
                              <Checkbox
                                key={option.id}
                                label={option.label}
                                checked={isChecked}
                                onChange={() => handleDropdownToggle(option.id)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className={styles.divider} />
            <div className={styles.sectionFrame}>
              <h3 className={styles.sectionTitle}>유형별</h3>
              <div className={styles.chipContainer}>
                {typeFilters.map((filter) => {
                  const isSelected = localTypeIds.includes(filter.id);
                  return (
                    <Chip
                      key={filter.id}
                      type="button"
                      shape="square"
                      label={filter.label}
                      state={isSelected ? "active" : undefined}
                      onClick={() => handleTypeToggle(filter.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.footerFrame}>
            <div className={styles.buttonContainer}>
              <Button
                label="초기화"
                size="48"
                tone="default"
                onClick={handleReset}
                disabled={isClosing}
                className={styles.resetButtonOverride}
              />
              <Button
                label="적용"
                size="48"
                tone="dark"
                onClick={handleApply}
                disabled={isClosing}
                className={styles.applyButtonOverride}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetFilter;
