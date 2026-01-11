"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { GRAPH_TABS } from "@/shared/constants/routes";
import {
  createBottomNavItems,
  getBottomNavActiveKey,
  getIsBottomNavHidden,
  isGraphTab,
} from "@/shared/components/bottom-nav/constants/bottom-nav";

export const useBottomNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isHidden = useMemo(() => getIsBottomNavHidden(pathname), [pathname]);
  const activeKey = useMemo(() => getBottomNavActiveKey(pathname), [pathname]);

  const tabParam = searchParams.get("tab");
  const graphTab = isGraphTab(tabParam) ? tabParam : GRAPH_TABS.UNIT;

  const items = useMemo(() => createBottomNavItems(graphTab), [graphTab]);

  return { isHidden, activeKey, items };
};
