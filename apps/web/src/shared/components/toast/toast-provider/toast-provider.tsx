"use client";

import { Toaster } from "react-hot-toast";
import * as s from "@/shared/components/toast/toast-provider/toast-provider.css";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      gutter={12}
      toastOptions={{ duration: 2500 }}
      containerClassName={s.container}
      containerStyle={{
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "43rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );
};
