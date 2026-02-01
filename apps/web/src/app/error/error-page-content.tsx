"use client";

import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import { type ErrorType } from "@/shared/constants/routes";
import * as s from "./error-page-content.css";

const ERROR_CONFIG: Record<
  ErrorType,
  {
    title: string;
  }
> = {
  "404": {
    title: "페이지를 찾을 수 없어요.",
  },
  "500": {
    title: "잠시 문제가 발생했어요.\n다시 한번 시도해주세요.",
  },
};

const DEFAULT_ERROR_CONFIG = ERROR_CONFIG["500"];

type ErrorPageContentProps = {
  errorType: ErrorType;
  onReset?: () => void;
  onGoHome?: () => void;
};

export const ErrorPageContent = ({
  errorType,
  onReset,
  onGoHome,
}: ErrorPageContentProps) => {
  const config =
    errorType in ERROR_CONFIG
      ? ERROR_CONFIG[errorType as ErrorType]
      : DEFAULT_ERROR_CONFIG;

  const primaryAction = onReset ?? onGoHome;

  return (
    <main className={s.page}>
      <div className={s.content}>
        <div className={s.iconWrapper}>
          <Icon name="error" size={8} />
        </div>
        <h1 className={s.title}>{config.title}</h1>
        {primaryAction && (
          <div className={s.actions}>
            <Button
              fullWidth
              tone="dark"
              label={onReset ? "다시 시도" : "홈으로"}
              size="48"
              onClick={primaryAction}
            />
          </div>
        )}
      </div>
    </main>
  );
};
