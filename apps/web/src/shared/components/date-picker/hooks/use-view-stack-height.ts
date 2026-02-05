import { useEffect, useLayoutEffect, useCallback, type RefObject } from "react";
import type { Transition, View } from "../utils/transition-utils";

type ViewRefs = Partial<Record<View, RefObject<HTMLElement | null>>>;

const getViewHeight = (
  viewStackRef: RefObject<HTMLElement | null>,
  view: View,
  refs: ViewRefs
) => {
  if (view === "calendar") {
    const el = viewStackRef.current?.querySelector(
      '[class*="viewPanel"]'
    ) as HTMLElement | null;
    return el?.scrollHeight ?? 0;
  }
  return refs[view]?.current?.scrollHeight ?? 0;
};

export const useViewStackHeight = (params: {
  isOpen: boolean;
  viewStackRef: RefObject<HTMLElement | null>;
  viewRefs: ViewRefs;
  transition: Transition | null;
  activeView: View;
  depsKey?: unknown;
}) => {
  const { isOpen, viewStackRef, viewRefs, transition, activeView, depsKey } =
    params;

  const applyHeight = useCallback(() => {
    const stack = viewStackRef.current;
    if (!stack) return;

    const targetView = transition ? transition.to : activeView;
    const h = getViewHeight(viewStackRef, targetView, viewRefs);
    if (h > 0) stack.style.height = `${h}px`;
  }, [viewStackRef, viewRefs, transition, activeView]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => applyHeight());
    });
  }, [isOpen, applyHeight]);

  useEffect(() => {
    if (!isOpen) return;
    if (!viewStackRef.current) return;

    const ro = new ResizeObserver(() => applyHeight());
    const stack = viewStackRef.current;
    const calendarEl = stack.querySelector('[class*="viewPanel"]');
    if (calendarEl instanceof HTMLElement) ro.observe(calendarEl);

    Object.values(viewRefs).forEach((r) => {
      if (r?.current) ro.observe(r.current);
    });

    return () => ro.disconnect();
  }, [isOpen, viewStackRef, viewRefs, applyHeight, depsKey]);
};

