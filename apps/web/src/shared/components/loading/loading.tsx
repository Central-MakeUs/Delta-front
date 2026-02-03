"use client";

import BackButton from "@/shared/components/app-bar/components/back-button";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/loading/loading.css";

export type LoadingVariant = "inline" | "overlay";

export type LoadingProps = {
  variant?: LoadingVariant;
  message?: string;
  showMessage?: boolean;
  onBack?: () => void;
};

const Loading = ({
  variant = "inline",
  message = "문제의 단원과 유형을 분석 중이에요..",
  showMessage = true,
  onBack,
}: LoadingProps) => {
  return (
    <div
      className={variant === "overlay" ? s.overlay : s.inline}
      role="status"
      aria-live="polite"
      aria-busy="true"
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
