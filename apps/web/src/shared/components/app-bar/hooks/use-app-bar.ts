"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppBarProps } from "@/shared/components/app-bar/app-bar";
import { ROUTES } from "@/shared/constants/routes";
import {
  getWrongRouteMatch,
  parseProgress,
  shouldHideAppBar,
} from "@/shared/components/app-bar/utils/app-bar-routing";

type UseAppBarResult =
  | { isHidden: true; props?: never }
  | { isHidden: false; props: AppBarProps };

export const useAppBar = (): UseAppBarResult => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  if (shouldHideAppBar(pathname)) return { isHidden: true };

  /* HOME */
  if (pathname === ROUTES.HOME) {
    return {
      isHidden: false,
      props: {
        variant: "default",
        onLogoClick: () => router.push(ROUTES.HOME),
        onUserClick: () => router.push(ROUTES.MY.ROOT),
      },
    };
  }

  /* my */
  if (pathname.startsWith(ROUTES.MY.ROOT)) {
    return {
      isHidden: false,
      props: {
        variant: "basic",
        title: "내 정보",
        surface: "transparent",
        onBack: () => router.back(),
      },
    };
  }

  /* wrong */
  const wrongMatch = getWrongRouteMatch(pathname);

  if (wrongMatch.type === "create") {
    const { total, currentStep } = parseProgress(
      new URLSearchParams(sp.toString())
    );

    return {
      isHidden: false,
      props: {
        variant: "progress",
        total,
        currentStep,
        onBack: () => router.back(),
        /* 첫 인덱스에서만 건너뛰기 숨김 */
        showSkip: currentStep !== 1,
        onSkip: () => router.push(ROUTES.WRONG.CREATE_DONE),
      },
    };
  }

  if (wrongMatch.type === "list") {
    return {
      isHidden: false,
      props: { variant: "title", title: "오답 목록" },
    };
  }

  if (wrongMatch.type === "detail") {
    return {
      isHidden: false,
      props: {
        variant: "basicAction",
        title: "오답 상세 보기",
        actionLabel: "수정하기",
        onBack: () => router.back(),
        onActionClick: () => router.push(ROUTES.WRONG.EDIT(wrongMatch.id)),
      },
    };
  }

  if (wrongMatch.type === "edit") {
    return {
      isHidden: false,
      props: {
        variant: "basic",
        title: "수정하기",
        onBack: () => router.back(),
      },
    };
  }

  // 기타 페이지는 일단 AppBar 없음
  return { isHidden: true };
};

export default useAppBar;
