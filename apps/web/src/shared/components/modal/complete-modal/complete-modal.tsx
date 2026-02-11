"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import * as styles from "./complete-modal.css";

export interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  descriptionClassName?: string;
  overlayClassName?: string;
  iconName?: React.ComponentProps<typeof Icon>["name"];
  actions?: "both" | "cancelOnly" | "confirmOnly";
}

const LOCK_KEY = "data-semo-modal-lock-count";

const lockBodyScroll = () => {
  const raw = document.body.getAttribute(LOCK_KEY) ?? "0";
  const count = Number(raw);

  if (count === 0) document.body.style.overflow = "hidden";
  document.body.setAttribute(LOCK_KEY, String(count + 1));
};

const unlockBodyScroll = () => {
  const raw = document.body.getAttribute(LOCK_KEY) ?? "0";
  const count = Number(raw);

  const next = Math.max(0, count - 1);
  if (next === 0) {
    document.body.style.overflow = "unset";
    document.body.removeAttribute(LOCK_KEY);
    return;
  }

  document.body.setAttribute(LOCK_KEY, String(next));
};

export const CompleteModal = ({
  isOpen,
  onClose,
  title,
  description,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onCancel,
  onConfirm,
  size = "md",
  className,
  overlayClassName,
  descriptionClassName,
  iconName = "modal-icon",
  actions = "both",
}: CompleteModalProps) => {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return unlockBodyScroll;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showCancel = actions === "both" || actions === "cancelOnly";
  const showConfirm = actions === "both" || actions === "confirmOnly";

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return createPortal(
    <div
      className={clsx(styles.overlay, overlayClassName)}
      onMouseDown={handleOverlayMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
    >
      <div
        className={clsx(styles.modal({ size }), className)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.contentContainer}>
            <div className={styles.iconContainer}>
              <Icon name={iconName} size={6.427} className={styles.icon} />
            </div>
            <div className={styles.textContainer}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              {description && (
                <p
                  id={descId}
                  className={clsx(styles.description, descriptionClassName)}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            {showCancel && (
              <div className={styles.buttonWrapper}>
                <Button
                  label={cancelLabel}
                  size="48"
                  tone="surface"
                  fullWidth
                  onClick={handleCancel}
                />
              </div>
            )}

            {showConfirm && (
              <div className={styles.buttonWrapper}>
                <Button
                  label={confirmLabel}
                  size="48"
                  tone="dark"
                  fullWidth
                  onClick={handleConfirm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CompleteModal;
