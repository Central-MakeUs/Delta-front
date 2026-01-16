"use client";

import { useLayoutEffect, useRef } from "react";
import type * as s from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01.css";
import {
  toCssVarName,
  prefersReducedMotion,
} from "@/shared/components/bar-graph/bar-graph-01/utils/bar-graph-01";

type Params = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  fillPercentVar: typeof s.fillPercentVar;
  hasProgress: boolean;
  animate: boolean;
  animateFromZeroOnMount: boolean;
  replayKey?: string | number;
  targetVisualPercent: number;
};

export const useBarGraphMotion = ({
  rootRef,
  fillPercentVar,
  hasProgress,
  animate,
  animateFromZeroOnMount,
  replayKey,
  targetVisualPercent,
}: Params) => {
  const mountedRef = useRef(false);
  const prevReplayKeyRef = useRef<string | number | undefined>(undefined);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const fillVarName = toCssVarName(fillPercentVar);

    if (raf1Ref.current) window.cancelAnimationFrame(raf1Ref.current);
    if (raf2Ref.current) window.cancelAnimationFrame(raf2Ref.current);
    raf1Ref.current = null;
    raf2Ref.current = null;

    if (!hasProgress) {
      el.style.setProperty(fillVarName, "0%");
      mountedRef.current = true;
      prevReplayKeyRef.current = replayKey;
      return;
    }

    const reduced = prefersReducedMotion();

    if (!animate || reduced) {
      el.style.setProperty(fillVarName, `${targetVisualPercent}%`);
      mountedRef.current = true;
      prevReplayKeyRef.current = replayKey;
      return;
    }

    const replayKeyChanged =
      replayKey !== undefined && replayKey !== prevReplayKeyRef.current;

    const shouldKick =
      replayKeyChanged || (!mountedRef.current && animateFromZeroOnMount);

    mountedRef.current = true;
    prevReplayKeyRef.current = replayKey;

    if (!shouldKick) {
      el.style.setProperty(fillVarName, `${targetVisualPercent}%`);
      return;
    }

    el.style.setProperty(fillVarName, "0%");

    raf1Ref.current = window.requestAnimationFrame(() => {
      raf2Ref.current = window.requestAnimationFrame(() => {
        el.style.setProperty(fillVarName, `${targetVisualPercent}%`);
      });
    });

    return () => {
      if (raf1Ref.current) window.cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current) window.cancelAnimationFrame(raf2Ref.current);
    };
  }, [
    rootRef,
    fillPercentVar,
    hasProgress,
    animate,
    animateFromZeroOnMount,
    replayKey,
    targetVisualPercent,
  ]);
};
