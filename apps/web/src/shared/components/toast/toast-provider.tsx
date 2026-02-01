"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      gutter={12}
      toastOptions={{ duration: 2500 }}
      containerStyle={{
        width: "100%",
        maxWidth: "43rem",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "1.6rem",
        zIndex: 16,
      }}
    />
  );
};
