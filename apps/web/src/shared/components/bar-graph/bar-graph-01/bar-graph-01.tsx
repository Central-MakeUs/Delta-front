"use client";

import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useLayoutEffect, useRef } from "react";
import * as s from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01.css";

type BarGraph01Props = {
  percent: number;
  className?: string;
  ariaLabel?: string;
  tipOverlapRem?: number;
  label?: string;
  minPercent?: number;
  maxPercent?: number;
  animate?: boolean;
  animateFromZeroOnMount?: boolean;
  replayKey?: string | number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
};

const toCssVarName = (v: string) => {
  if (v.startsWith("var(") && v.endsWith(")")) return v.slice(4, -1).trim();
  return v;
};

const computeMotionMs = (percent: number) => {
  const minMs = 450;
  const maxMs = 1400;
  const ms = minMs + percent * 10;
  return clamp(ms, minMs, maxMs);
};

export const BarGraph01 = ({
  percent,
  className,
  ariaLabel = "progress",
  tipOverlapRem = 1.2,
  label,
  minPercent = 10,
  maxPercent = 85,
  animate = true,
  animateFromZeroOnMount = true,
  replayKey,
}: BarGraph01Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);
  const prevReplayKeyRef = useRef<string | number | undefined>(undefined);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  const rawPercent = clamp(percent, 0, 100);

  const min = clamp(minPercent, 0, 100);
  const max = clamp(maxPercent, 0, 100);
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);

  const targetVisualPercent =
    rawPercent === 0 ? 0 : lo + (rawPercent / 100) * (hi - lo);

  const hasProgress = rawPercent > 0;

  const reduced = prefersReducedMotion();
  const motionMs = reduced ? 0 : computeMotionMs(rawPercent);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const fillVarName = toCssVarName(s.fillPercentVar);

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
    animate,
    animateFromZeroOnMount,
    hasProgress,
    reduced,
    replayKey,
    targetVisualPercent,
  ]);

  return (
    <div
      ref={rootRef}
      className={clsx(s.root, className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={rawPercent}
      style={assignInlineVars({
        [s.tipOverlapVar]: `${tipOverlapRem}rem`,
        [s.motionMsVar]: `${motionMs}ms`,
      })}
    >
      <div className={s.track} aria-hidden />
      {hasProgress && <div className={s.fill} aria-hidden />}
      {hasProgress && <div className={s.tip} aria-hidden />}
      {label && <span className={s.label}>{label}</span>}
    </div>
  );
};

export default BarGraph01;
