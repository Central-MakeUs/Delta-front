"use client";

import toast from "react-hot-toast";
import { ToastItem } from "@/shared/components/toast/toast-item/toast-item";

export type ToastVariant = "success" | "error";

type ShowToastParams = {
  variant: ToastVariant;
  message: string;
  bottomOffsetRem?: number;
  duration?: number;
};

export const showToast = ({
  variant,
  message,
  /* 바텀시트나 바텀버튼이 있는 사용처에서는 6.5, 없는 사용처에서는 기본값(1.6)으로 사용해 주세요! */
  bottomOffsetRem = 1.6,
  duration,
}: ShowToastParams) => {
  toast.custom(
    (t) => (
      <div
        style={{
          width: "100%",
          transform:
            bottomOffsetRem > 0
              ? `translateY(-${bottomOffsetRem}rem)`
              : undefined,
          willChange: bottomOffsetRem > 0 ? "transform" : undefined,
        }}
      >
        <ToastItem
          variant={variant}
          message={message}
          visible={t.visible}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    duration != null ? { duration } : undefined
  );
};

export const toastSuccess = (message: string, bottomOffsetRem?: number) =>
  showToast({ variant: "success", message, bottomOffsetRem });

export const toastError = (message: string, bottomOffsetRem?: number) =>
  showToast({ variant: "error", message, bottomOffsetRem });
