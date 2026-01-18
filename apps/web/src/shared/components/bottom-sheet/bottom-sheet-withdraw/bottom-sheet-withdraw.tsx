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
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const shouldRender = isOpen || isClosing;
  const titleId = useId();

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
      setIsClosing(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (isClosing) return;
    setIsClosing(true);
  };

  const handleSheetAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!isClosing) return;
    setIsClosing(false);
    onClose();
  };

  const handleConfirm = () => {
    if (disabled || isClosing) return;
    onConfirm?.();
    setIsClosing(true);
  };

  const handleCancel = () => {
    if (isClosing) return;
    onCancel?.();
    setIsClosing(true);
  };

  if (!shouldRender) return null;

  const motionState = isClosing ? "closing" : "open";

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      data-state={motionState}
      onClick={handleOverlayClick}
    >
      <div
        ref={bottomSheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx(styles.bottomSheet, className)}
        data-state={motionState}
        onAnimationEnd={handleSheetAnimationEnd}
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
