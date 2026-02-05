import { useEffect, useLayoutEffect, useCallback, type RefObject } from "react";
import type {
  Transition,
  View,
} from "@/shared/components/date-picker/utils/transition-utils";

type ViewRefs = Partial<Record<View, RefObject<HTMLElement | null>>>;

const getViewHeight = (
  viewStackRef: RefObject<HTMLElement | null>,
  view: View,
  refs: ViewRefs
) => {
  if (view === "calendar") {
    const stack = viewStackRef.current;
    if (!stack) return 0;

    const el = stack.querySelector(
      '[class*="viewPanel"]'
    ) as HTMLElement | null;

    const h = el?.scrollHeight ?? 0;
    return h > 0 ? Math.ceil(h) + 1 : 0;
  }

  const h = refs[view]?.current?.scrollHeight ?? 0;
  return h > 0 ? Math.ceil(h) + 1 : 0;
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

    if (h > 0) {
      stack.style.height = `${h}px`;
      stack.style.minHeight = `${h}px`;
    }
  }, [viewStackRef, viewRefs, transition, activeView]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => applyHeight());
    });
  }, [isOpen, applyHeight]);

  useEffect(() => {
    if (!isOpen) return;

    const stack = viewStackRef.current;
    if (!stack) return;

    const ro = new ResizeObserver(() => applyHeight());
    const calendarEl = stack.querySelector('[class*="viewPanel"]');
    if (calendarEl instanceof HTMLElement) ro.observe(calendarEl);

    Object.values(viewRefs).forEach((r) => {
      if (r?.current) ro.observe(r.current);
    });

    return () => ro.disconnect();
  }, [isOpen, viewStackRef, viewRefs, applyHeight, depsKey]);
};
