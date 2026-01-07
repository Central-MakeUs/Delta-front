"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { IconProps } from "@/shared/components/icon/icon";
import Icon from "@/shared/components/icon/icon";
import { GRAPH_TABS, ROUTES, type GraphTab } from "@/shared/constants/routes";
import * as s from "./bottom-nav.css";

type IconName = IconProps["name"];
type NavKey = "home" | "note" | "graph";
type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  iconName: (isActive: boolean) => IconName;
};

const isGraphTab = (value: string | null): value is GraphTab => {
  return value === GRAPH_TABS.WRONG || value === GRAPH_TABS.UNIT;
};

const getIsHidden = (pathname: string) => {
  if (pathname === ROUTES.AUTH.LOGIN) return true;
  if (pathname.startsWith(ROUTES.WRONG.CREATE)) return true;
  if (pathname.startsWith(`${ROUTES.WRONG.ROOT}/`)) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 2) return true;
    if (segments.length === 3 && segments[2] === "edit") return true;
  }
  return false;
};

const getActiveKey = (pathname: string): NavKey => {
  if (pathname === ROUTES.HOME) return "home";
  if (pathname.startsWith(ROUTES.WRONG.ROOT)) return "note";
  if (pathname.startsWith(ROUTES.GRAPH.ROOT)) return "graph";
  return "home";
};

const BottomNavItem = ({
  isActive,
  label,
  iconName,
  onClick,
}: {
  isActive: boolean;
  label: string;
  iconName: IconName;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={s.item}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span
        className={clsx(s.iconWrap, isActive ? s.iconActive : s.iconInactive)}
      >
        <Icon size={2.4} name={iconName} />
      </span>
      <span
        className={clsx(s.label, isActive ? s.labelActive : s.labelInactive)}
      >
        {label}
      </span>
    </button>
  );
};

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHidden = useMemo(() => getIsHidden(pathname), [pathname]);
  const activeKey = useMemo(() => getActiveKey(pathname), [pathname]);
  const graphTab = isGraphTab(searchParams.get("tab"))
    ? (searchParams.get("tab") as GraphTab)
    : GRAPH_TABS.WRONG;

  const items = useMemo<readonly NavItem[]>(
    () => [
      {
        key: "home",
        label: "홈",
        href: ROUTES.HOME,
        iconName: () => "home-active",
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
    ],
    [graphTab]
  );

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  if (isHidden) return null;

  return (
    <>
      <div className={s.spacer} aria-hidden />
      <nav className={s.root} aria-label="하단 내비게이션">
        <div className={s.container}>
          <div className={s.list}>
            {items.map((item) => {
              const isActive = activeKey === item.key;
              return (
                <BottomNavItem
                  key={item.key}
                  isActive={isActive}
                  label={item.label}
                  iconName={item.iconName(isActive)}
                  onClick={() => handleNavigate(item.href)}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
