"use client";

import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import { ROUTES, type ErrorType } from "@/shared/constants/routes";
import * as s from "./error-page-content.css";

const ERROR_CONFIG: Record<
  ErrorType,
  { title: string; description: string; primaryLabel: string; primaryAction: "home" | "login" }
> = {
  "401": {
    title: "로그인이 필요해요",
    description: "다시 로그인한 뒤 이용해 주세요.",
    primaryLabel: "로그인하기",
    primaryAction: "login",
  },
  "404": {
    title: "페이지를 찾을 수 없어요",
    description: "요청하신 페이지가 없거나 이동했을 수 있어요.",
    primaryLabel: "홈으로 가기",
    primaryAction: "home",
  },
  "500": {
    title: "일시적인 오류가 발생했어요",
    description: "잠시 후 다시 시도해 주세요.",
    primaryLabel: "홈으로 가기",
    primaryAction: "home",
  },
};

type ErrorPageContentProps = {
  errorType: ErrorType;
};

export const ErrorPageContent = ({ errorType }: ErrorPageContentProps) => {
  const router = useRouter();
  const config = ERROR_CONFIG[errorType];

  const onPrimary = () => {
    if (config.primaryAction === "login") {
      router.replace(ROUTES.AUTH.LOGIN);
    } else {
      router.replace(ROUTES.HOME);
    }
  };

  return (
    <main className={s.page}>
      <div className={s.content}>
        <div className={s.iconWrapper}>
          <Icon name="error" size={8} />
        </div>
        <h1 className={s.title}>{config.title}</h1>
        <p className={s.description}>{config.description}</p>
        <div className={s.actions}>
          <Button
            label={config.primaryLabel}
            tone="default"
            fullWidth
            onClick={onPrimary}
          />
        </div>
      </div>
    </main>
  );
};
