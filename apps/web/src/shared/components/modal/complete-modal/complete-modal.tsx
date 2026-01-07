import React, { useEffect } from "react";
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
  overlayClassName?: string;
}

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
}: CompleteModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      onClick={handleOverlayClick}
    >
      <div className={clsx(styles.modal({ size }), className)}>
        <div className={styles.header}>
          <div className={styles.contentContainer}>
            <div className={styles.iconContainer}>
              <Icon
                name="modal-icon"
                size={6.427}
                className={styles.icon}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Button
                label={cancelLabel}
                size="48"
                tone="surface"
                fullWidth
                onClick={handleCancel}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                label={confirmLabel}
                size="48"
                tone="dark"
                fullWidth
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;

