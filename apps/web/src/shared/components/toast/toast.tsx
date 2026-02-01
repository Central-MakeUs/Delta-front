"use client";

import toast from "react-hot-toast";
import { ToastItem } from "./toast-item/toast-item";

export type ToastVariant = "success" | "error";

type ShowToastParams = {
  variant: ToastVariant;
  message: string;
};

export const showToast = ({ variant, message }: ShowToastParams) => {
  toast.custom((t) => (
    <ToastItem
      variant={variant}
      message={message}
      visible={t.visible}
      onClose={() => toast.dismiss(t.id)}
    />
  ));
};

export const toastSuccess = (message: string) =>
  showToast({ variant: "success", message });
export const toastError = (message: string) =>
  showToast({ variant: "error", message });
