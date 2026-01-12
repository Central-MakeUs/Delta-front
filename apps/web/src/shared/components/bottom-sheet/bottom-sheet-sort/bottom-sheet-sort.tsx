"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort.css";
import Icon from "@/shared/components/icon/icon";
import { slideDown } from "@/shared/components/bottom-sheet/styles/animations.css";

export type SortOption = {
  id: string;
  label: string;
};

export interface BottomSheetSortProps {
  isOpen: boolean;
  onClose: () => void;
  options: SortOption[];
  selectedOptionId?: string;
  onSelect?: (optionId: string) => void;
  className?: string;
  overlayClassName?: string;
}

export const BottomSheetSort = ({
  isOpen,
  onClose,
  options,
  selectedOptionId,
  onSelect,
  className,
  overlayClassName,
}: BottomSheetSortProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    requestClose();
  };

  const handleOptionClick = (optionId: string) => {
    if (isClosing) return;
    onSelect?.(optionId);
    requestClose();
  };

  const handleSheetAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (!isClosing) return;
    if (e.target !== e.currentTarget) return;

    if (e.animationName !== slideDown) return;

    setIsClosing(false);
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
      if (e.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      data-state={isClosing ? "closing" : "open"}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="정렬"
    >
      <div
        className={clsx(styles.bottomSheet, className)}
        data-state={isClosing ? "closing" : "open"}
        onAnimationEnd={handleSheetAnimationEnd}
      >
        <div className={styles.frameContainer}>
          <div className={styles.headerFrame}>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>정렬</h2>
              <button
                type="button"
                className={styles.closeButton}
                onClick={requestClose}
                disabled={isClosing}
                aria-label="닫기"
              >
                <Icon name="multiple" size={2.4} />
              </button>
            </div>
          </div>

          <div
            className={styles.listFrame}
            role="listbox"
            aria-label="정렬 옵션"
          >
            {options.map((option) => {
              const isSelected = option.id === selectedOptionId;

              return (
                <button
                  type="button"
                  key={option.id}
                  className={styles.listItem}
                  onClick={() => handleOptionClick(option.id)}
                  role="option"
                  aria-selected={isSelected}
                  disabled={isClosing}
                >
                  <span
                    className={clsx(
                      styles.listItemText,
                      isSelected && styles.listItemTextSelected
                    )}
                  >
                    {option.label}
                  </span>

                  {isSelected && (
                    <Icon
                      name="check-mark"
                      size={2.4}
                      className={styles.checkIcon}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetSort;
