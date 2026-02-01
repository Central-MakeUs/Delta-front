"use client";

import * as s from "@/shared/components/toast/toast-item/toast-item.css";
import Icon from "@/shared/components/icon/icon";
import type { IconName } from "@/shared/constants/icons";

export type ToastVariant = "success" | "error";

type ToastItemProps = {
  variant: ToastVariant;
  message: string;
  visible: boolean;
  onClose: () => void;
};

const ICON_NAME_BY_VARIANT: Record<ToastVariant, IconName> = {
  success: "toast-success",
  error: "toast-error",
};

export const ToastItem = ({
  variant,
  message,
  visible,
  onClose,
}: ToastItemProps) => {
  const iconName = ICON_NAME_BY_VARIANT[variant];

  return (
    <div className={s.container}>
      <div
        className={`${s.root} ${visible ? s.enter : s.leave}`}
        role="status"
        aria-live="polite"
      >
        <div className={s.frame}>
          <Icon name={iconName} size={2.4} />
          <p className={s.message}>{message}</p>
        </div>
        <button type="button" onClick={onClose} className={s.srOnly}>
          닫기
        </button>
      </div>
    </div>
  );
};
