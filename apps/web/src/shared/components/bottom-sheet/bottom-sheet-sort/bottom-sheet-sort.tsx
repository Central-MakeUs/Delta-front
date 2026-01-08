import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import * as styles from "./bottom-sheet-sort.css";

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

const ANIMATION_DURATION = 300;

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// pull 이후 지울 예정
const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  const prevIsOpenRef = useRef(isOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    const prevIsOpen = prevIsOpenRef.current;
    
    if (isOpen !== prevIsOpen) {
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
  }, [isOpen]);

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

  const handleOptionClick = (optionId: string) => {
    if (isClosing) return;
    onSelect?.(optionId);
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
              <h2 className={styles.title}>정렬</h2>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                disabled={isClosing}
                aria-label="닫기"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className={styles.listFrame}>
            {options.map((option) => {
              const isSelected = option.id === selectedOptionId;
              return (
                <div
                  key={option.id}
                  className={clsx(
                    styles.listItem,
                    isSelected && styles.listItemSelected
                  )}
                  onClick={() => handleOptionClick(option.id)}
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
                    <div className={styles.checkIcon}>
                      <CheckIcon />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetSort;

