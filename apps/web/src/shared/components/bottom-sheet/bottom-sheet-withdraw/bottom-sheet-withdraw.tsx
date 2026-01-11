import React, { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import * as styles from "./bottom-sheet-withdraw.css";

export interface BottomSheetWithdrawProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
}

const ANIMATION_DURATION = 300;

export const BottomSheetWithdraw = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "더 써볼래요",
  onConfirm,
  onCancel,
  className,
  overlayClassName,
  disabled = false,
}: BottomSheetWithdrawProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpenRef = useRef(isOpen);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevBodyOverflowRef = useRef<string | null>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const shouldRender = isOpen || isClosing;
  const titleId = useId();

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
      if (prevBodyOverflowRef.current === null) {
        prevBodyOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
    }

    if (isClosing) {
      timeoutRef.current = setTimeout(() => {
        setIsClosing(false);
        document.body.style.overflow = prevBodyOverflowRef.current ?? "";
        prevBodyOverflowRef.current = null;
      }, ANIMATION_DURATION);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        // 언마운트/중단 시에도 복구 보장
        document.body.style.overflow = prevBodyOverflowRef.current ?? "";
        prevBodyOverflowRef.current = null;
      };
    }

    return () => {
      // 언마운트 포함: 항상 복구
      if (!isOpen) {
        document.body.style.overflow = prevBodyOverflowRef.current ?? "";
        prevBodyOverflowRef.current = null;
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

  // 포커스 관리
  useEffect(() => {
    if (isOpen && !isClosing) {
      // 오픈 시 이전 포커스 저장
      previousActiveElementRef.current =
        (document.activeElement as HTMLElement) || null;

      // 바텀시트에 포커스 이동
      requestAnimationFrame(() => {
        bottomSheetRef.current?.focus();
      });
    } else if (!isOpen && !isClosing && previousActiveElementRef.current) {
      // 클로즈 시 이전 포커스 복귀
      requestAnimationFrame(() => {
        previousActiveElementRef.current?.focus();
        previousActiveElementRef.current = null;
      });
    }
  }, [isOpen, isClosing]);

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

  const handleConfirm = () => {
    if (disabled || isClosing) return;
    onConfirm?.();
    handleClose();
  };

  const handleCancel = () => {
    if (isClosing) return;
    onCancel?.();
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
        ref={bottomSheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx(
          styles.bottomSheet,
          isClosing && styles.bottomSheetClosing,
          className
        )}
      >
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description && (
              <div className={styles.descriptionWrapper}>
                <p className={styles.description}>
                  {description
                    .split("<br/>")
                    .map((line: string, index: number, array: string[]) => (
                      <React.Fragment key={`${index}-${line}`}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <Button
              label={confirmLabel}
              size="48"
              tone="dark"
              fullWidth
              onClick={handleConfirm}
              disabled={disabled || isClosing}
              className={styles.confirmButtonOverride}
            />
            <button
              type="button"
              className={styles.cancelText}
              onClick={handleCancel}
              disabled={isClosing}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetWithdraw;
