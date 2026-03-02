"use client";

import clsx from "clsx";
import { useEffect } from "react";
import BackButton from "@/shared/components/app-bar/components/back-button";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/loading/loading.css";

export type LoadingVariant = "inline" | "overlay";

export type LoadingProps = {
  variant?: LoadingVariant;
  message?: string;
  showMessage?: boolean;
  onBack?: () => void;
  className?: string;
  unstyled?: boolean;
};

const postSafeAreaEdges = (
  edges: Array<"top" | "bottom" | "left" | "right">
) => {
  if (typeof window === "undefined") return;
  const rn = (
    window as unknown as {
      ReactNativeWebView?: { postMessage: (v: string) => void };
    }
  ).ReactNativeWebView;

  rn?.postMessage(JSON.stringify({ type: "SAFE_AREA_EDGES", edges }));
};

const isWebView = () => {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as unknown as { ReactNativeWebView?: unknown }).ReactNativeWebView
  );
};

const Loading = ({
  variant = "inline",
  message = "문제의 단원과 유형을 분석 중이에요..",
  showMessage = true,
  onBack,
  className,
  unstyled = false,
  ...rest
}: LoadingProps) => {
  useEffect(() => {
    if (!isWebView()) return;
    if (variant !== "overlay") return;

    postSafeAreaEdges([]);
    return () => {
      postSafeAreaEdges(["top", "bottom"]);
    };
  }, [variant]);

  const rootClass = clsx(
    !unstyled && (variant === "overlay" ? s.overlay : s.inline),
    className
  );

  return (
    <div
      className={rootClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...rest}
    >
      {variant === "overlay" && onBack ? (
        <div className={s.backButton}>
          <BackButton onClick={onBack} />
        </div>
      ) : null}

      <div className={s.center}>
        <div className={s.spinnerBox} aria-hidden="true">
          <div className={s.ring} />
          <div className={s.icon}>
            <Icon name="modal-icon" width={4.4} height={4} />
          </div>
        </div>
        {showMessage ? <p className={s.message}>{message}</p> : null}
      </div>
    </div>
  );
};

export default Loading;
