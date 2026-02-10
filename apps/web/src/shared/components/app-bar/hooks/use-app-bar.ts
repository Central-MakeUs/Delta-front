import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppBarProps } from "@/shared/components/app-bar/types/app-bar";
import { ROUTES, GRAPH_TABS, type GraphTab } from "@/shared/constants/routes";
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

const isGraphTab = (v: string | null): v is GraphTab =>
  v === GRAPH_TABS.UNIT || v === GRAPH_TABS.WRONG;

const isValidInternalPath = (path: string) => {
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
};

const parseFrom = (raw: string | null) => {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    return isValidInternalPath(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

const hasValidScanId = (params: URLSearchParams) => {
  const v = params.get("scanId");
  return Boolean(v && v !== "null" && v !== "undefined");
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

  if (pathname.startsWith(ROUTES.GRAPH.ROOT)) {
    const urlTab = sp.get("tab");
    const tab: GraphTab = isGraphTab(urlTab) ? urlTab : GRAPH_TABS.UNIT;

    return {
      isHidden: false,
      props: {
        variant: "graphTabs",
        tabs: [
          { value: GRAPH_TABS.UNIT, label: "단원별" },
          { value: GRAPH_TABS.WRONG, label: "유형별" },
        ],
        value: tab,
        onValueChange: (next) =>
          router.replace(ROUTES.GRAPH.tab(next as GraphTab)),
        surface: "transparent",
        tabsAriaLabel: "학습 탭",
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

    const from = parseFrom(params.get("from")) ?? ROUTES.WRONG.ROOT;
    const hasScan = hasValidScanId(params);

    const exitCreate = () => {
      if (from) {
        router.replace(from);
        return;
      }
      router.back();
    };

    const replaceStep = (nextStep: number) => {
      const safe = clamp(nextStep, 1, total);
      const nextParams = new URLSearchParams(sp.toString());

      if (safe === 1) {
        nextParams.set("step", "1");
        nextParams.delete("scanId");
        nextParams.delete("unitId");
        nextParams.delete("typeIds");
        router.replace(buildUrl(pathname, nextParams), { scroll: false });
        return;
      }

      if (!hasValidScanId(nextParams)) return;

      nextParams.set("step", String(safe));
      router.replace(buildUrl(pathname, nextParams), { scroll: false });
    };

    return {
      isHidden: false,
      props: {
        variant: "progress",
        total,
        currentStep: hasScan ? currentStep : 1,
        onStepChange: replaceStep,
        onBack: exitCreate,
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

  // 기타 페이지 (404 등)
  return {
    isHidden: false,
    props: {
      variant: "basic",
      title: "",
      onBack: () => router.back(),
    },
  };
};

export default useAppBar;
