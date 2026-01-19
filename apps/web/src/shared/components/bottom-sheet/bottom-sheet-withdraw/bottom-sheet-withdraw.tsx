"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
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

const createStableId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
};

export const BottomSheetWithdraw = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "네, 탈퇴할래요",
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
  const prevIsOpenRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevBodyOverflowRef = useRef<string | null>(null);

  const shouldRender = isOpen || isClosing;
  const titleId = useId();

  const descriptionLines = useMemo(() => {
    if (!description) return [];
    return description.split("<br/>").map((text) => ({
      id: createStableId(),
      text,
    }));
  }, [description]);

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
        document.body.style.overflow = prevBodyOverflowRef.current ?? "";
        prevBodyOverflowRef.current = null;
      };
    }
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

  useEffect(() => {
    if (isOpen && !isClosing) {
      previousActiveElementRef.current =
        (document.activeElement as HTMLElement) || null;

      requestAnimationFrame(() => {
        bottomSheetRef.current?.focus();
      });
    } else if (!isOpen && !isClosing && previousActiveElementRef.current) {
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
                  {descriptionLines.map((line, idx) => (
                    <React.Fragment key={line.id}>
                      {line.text}
                      {idx < descriptionLines.length - 1 && <br />}
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
              tone="complete"
              fullWidth
              onClick={handleConfirm}
              disabled={disabled || isClosing}
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
