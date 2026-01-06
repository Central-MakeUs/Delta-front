"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "@/shared/components/toggle/toggle.css";

type Params = {
  activeSide: "left" | "right";
  disabled: boolean;
};

export const useToggleIndicator = ({ activeSide, disabled }: Params) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLButtonElement | null>(null);
  const rightRef = useRef<HTMLButtonElement | null>(null);

  const [indicator, setIndicator] = useState({ x: 0, w: 0 });

  const updateIndicator = useCallback(() => {
    const rowEl = rowRef.current;
    const activeEl =
      activeSide === "right" ? rightRef.current : leftRef.current;
    if (!rowEl || !activeEl) return;

    const rowRect = rowEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    const nextX = activeRect.left - rowRect.left;
    const nextW = activeRect.width;

    setIndicator((prev) => {
      if (prev.x === nextX && prev.w === nextW) return prev;
      return { x: nextX, w: nextW };
    });
  }, [activeSide]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(updateIndicator);

    if (rowRef.current) ro.observe(rowRef.current);
    if (leftRef.current) ro.observe(leftRef.current);
    if (rightRef.current) ro.observe(rightRef.current);

    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const indicatorStyle = useMemo(
    () =>
      assignInlineVars({
        [s.indicatorXVar]: `${indicator.x}px`,
        [s.indicatorWVar]: `${indicator.w}px`,
        [s.indicatorOpacityVar]: disabled ? "0.55" : "1",
      }),
    [indicator.x, indicator.w, disabled]
  );

  return {
    rowRef,
    leftRef,
    rightRef,
    indicatorStyle,
    updateIndicator,
  };
};
