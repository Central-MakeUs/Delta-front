"use client";

import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
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
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevBodyOverflowRef = useRef<string | null>(null);
  const mountedRef = useRef(false);

  const shouldRender = isOpen || isClosing;
  const titleId = useId();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const schedule = useCallback((fn: () => void) => {
    const run = () => {
      if (!mountedRef.current) return;
      fn();
    };

    if (typeof queueMicrotask === "function") {
      queueMicrotask(run);
      return;
    }

    Promise.resolve().then(run);
  }, []);

  const descriptionLines = useMemo(() => {
    if (!description) return [];
    return description.split("<br/>").map((text) => ({
      id: createStableId(),
      text,
    }));
  }, [description]);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const requestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    onClose();
  }, [isClosing, onClose]);

  useEffect(() => {
    const prevIsOpen = prevIsOpenRef.current;
    if (isOpen === prevIsOpen) return;

    prevIsOpenRef.current = isOpen;

    if (isOpen) {
      clearCloseTimer();
      schedule(() => setIsClosing(false));
      return;
    }

    schedule(() => setIsClosing(true));
  }, [isOpen, clearCloseTimer, schedule]);

  useEffect(() => {
    clearCloseTimer();

    if (!isOpen && isClosing) {
      closeTimerRef.current = setTimeout(() => {
        setIsClosing(false);
        closeTimerRef.current = null;
      }, ANIMATION_DURATION);
    }

    return () => {
      clearCloseTimer();
    };
  }, [isOpen, isClosing, clearCloseTimer]);

  useEffect(() => {
    if (!shouldRender) return;

    if (prevBodyOverflowRef.current === null) {
      prevBodyOverflowRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflowRef.current ?? "";
      prevBodyOverflowRef.current = null;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shouldRender, requestClose]);

  useEffect(() => {
    if (isOpen && !isClosing) {
      previousActiveElementRef.current =
        (document.activeElement as HTMLElement) || null;
      requestAnimationFrame(() => {
        bottomSheetRef.current?.focus();
      });
      return;
    }

    if (!isOpen && !isClosing && previousActiveElementRef.current) {
      const el = previousActiveElementRef.current;
      previousActiveElementRef.current = null;
      requestAnimationFrame(() => {
        el.focus();
      });
    }
  }, [isOpen, isClosing]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      requestClose();
    },
    [requestClose]
  );

  const finishClose = useCallback(() => {
    if (isOpen) return;
    if (!isClosing) return;
    clearCloseTimer();
    setIsClosing(false);
  }, [isOpen, isClosing, clearCloseTimer]);

  const handleSheetAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      finishClose();
    },
    [finishClose]
  );

  const handleSheetTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      finishClose();
    },
    [finishClose]
  );

  const handleConfirm = useCallback(() => {
    if (disabled || isClosing) return;
    onConfirm?.();
    requestClose();
  }, [disabled, isClosing, onConfirm, requestClose]);

  const handleCancel = useCallback(() => {
    if (isClosing) return;
    onCancel?.();
    requestClose();
  }, [isClosing, onCancel, requestClose]);

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
        onTransitionEnd={handleSheetTransitionEnd}
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
