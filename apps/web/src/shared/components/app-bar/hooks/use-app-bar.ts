import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppBarProps } from "@/shared/components/app-bar/types/app-bar";
import { ROUTES } from "@/shared/constants/routes";
import {
  getWrongRouteMatch,
  parseProgress,
  shouldHideAppBar,
} from "@/shared/components/app-bar/utils/app-bar-routing";

type UseAppBarResult =
  | { isHidden: true; props?: never }
  | { isHidden: false; props: AppBarProps };

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const buildUrl = (pathname: string, params: URLSearchParams) => {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
};

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
        onProClick: () => router.push(ROUTES.PRO.ROOT),
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
    const params = new URLSearchParams(sp.toString());
    const { total, currentStep } = parseProgress(params);

    const isLoading = params.get("hideAppBar") === "1";
    if (isLoading) return { isHidden: true };

    const replaceStep = (nextStep: number) => {
      const safe = clamp(nextStep, 1, total);
      const nextParams = new URLSearchParams(sp.toString());
      nextParams.set("step", String(safe));
      router.replace(buildUrl(pathname, nextParams), { scroll: false });
    };

    const handleBack = () => {
      if (currentStep > 1) {
        replaceStep(currentStep - 1);
        return;
      }
      router.back();
    };

    return {
      isHidden: false,
      props: {
        variant: "progress",
        total,
        currentStep,
        onStepChange: replaceStep,
        onBack: handleBack,
      },
    };
  }

  if (wrongMatch.type === "list") {
    return {
      isHidden: false,
      props: {
        variant: "title",
        title: "오답 목록",
      },
    };
  }

  if (wrongMatch.type === "detail") {
    return {
      isHidden: false,
      props: {
        variant: "basicAction",
        title: "오답 상세 보기",
        actionLabel: "수정하기",
        onBack: () => router.push(ROUTES.WRONG.ROOT),
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

  // 기타 페이지
  return { isHidden: true };
};

export default useAppBar;
