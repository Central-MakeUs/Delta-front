import type { IconProps } from "@/shared/components/icon/icon";
import { GRAPH_TABS, ROUTES, type GraphTab } from "@/shared/constants/routes";

export type IconName = IconProps["name"];
export type NavKey = "home" | "note" | "graph";

export type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  iconName: (isActive: boolean) => IconName;
};

export const isGraphTab = (value: string | null): value is GraphTab => {
  return value === GRAPH_TABS.WRONG || value === GRAPH_TABS.UNIT;
};

export const getIsBottomNavHidden = (pathname: string) => {
  if (pathname === ROUTES.HOME) return false;
  if (pathname === ROUTES.WRONG.ROOT) return false;
  if (pathname.startsWith(ROUTES.GRAPH.ROOT)) return false;
  if (pathname === ROUTES.MY.ROOT) return false;

  return true;
};

export const getBottomNavActiveKey = (pathname: string): NavKey => {
  if (pathname === ROUTES.HOME) return "home";
  if (pathname.startsWith(ROUTES.WRONG.ROOT)) return "note";
  if (pathname.startsWith(ROUTES.GRAPH.ROOT)) return "graph";
  return "home";
};

export const createBottomNavItems = (
  graphTab: GraphTab
): readonly NavItem[] => {
  return [
    {
      key: "home",
      label: "홈",
      href: ROUTES.HOME,
      iconName: (isActive) => (isActive ? "home-active" : "home-default"),
    },
    {
      key: "note",
      label: "오답 목록",
      href: ROUTES.WRONG.ROOT,
      iconName: (isActive) => (isActive ? "note-active" : "note-default"),
    },
    {
      key: "graph",
      label: "그래프",
      href: ROUTES.GRAPH.tab(graphTab),
      iconName: (isActive) => (isActive ? "graph-active" : "graph-default"),
    },
  ] as const;
};
