"use client";

import { useRouter } from "next/navigation";
import { ErrorType, ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import type { IconName } from "@/shared/constants/icons";
import * as styles from "./error-page-content.css";

type ErrorPageContentProps = {
  errorType: ErrorType;
};

export const ErrorPageContent = ({ errorType }: ErrorPageContentProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleRefresh = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const getErrorContent = () => {
    switch (errorType) {
      case "401":
        return {
          icon: "error-500",
          title: "로그인이 만료됐어요.",
          buttons: (
            <Button label="로그인 하러 가기" size="48" onClick={handleLogin} />
          ),
        };
      case "404":
        return {
          icon: "error-404",
          title: "페이지를 찾을 수 없어요.",
          buttons: (
            <Button label="홈으로 가기" size="48" onClick={handleGoHome} />
          ),
        };
      default: // 500
        return {
          icon: "error-500",
          title: "일시적인 오류가 발생했어요.",
          buttons: (
            <>
              <Button label="새로고침" size="48" onClick={handleRefresh} />
              <Button label="홈으로 가기" size="48" onClick={handleGoHome} />
            </>
          ),
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Icon name={content.icon as IconName} size={5.6} />
        </div>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.actions}>{content.buttons}</div>
      </div>
    </div>
  );
};

export default ErrorPageContent;
