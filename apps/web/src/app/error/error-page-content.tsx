"use client";

import { useRouter } from "next/navigation";
import { ErrorType } from "@/shared/constants/routes";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import type { IconName } from "@/shared/constants/icons";
import * as styles from "./error-page-content.css";

type ErrorPageContentProps = {
  errorType: ErrorType;
};

export const ErrorPageContent = ({ errorType }: ErrorPageContentProps) => {
  const router = useRouter();

  // const handleLogin = () => {
  //   router.push("/login");
  // };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleRefresh = () => {
    // 이전 페이지로 이동 (history가 있으면 back, 없으면 홈으로)
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const getErrorContent = () => {
    switch (errorType) {
      // case "401":
      //   return {
      //     icon: "error",
      //     title: "로그인이 만료됐어요.",
      //     description: (
      //       <>
      //         세션이 만료되었거나 접근 권한이 없습니다.
      //         <br />
      //         다시 로그인 해주세요.
      //       </>
      //     ),
      //     buttons: (
      //       <Button label="로그인 하러 가기" size="48" onClick={handleLogin} />
      //     ),
      //   };
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
