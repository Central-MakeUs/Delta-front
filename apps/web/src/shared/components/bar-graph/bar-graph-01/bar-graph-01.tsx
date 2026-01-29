"use client";

import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useRef } from "react";
import * as s from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01.css";
import {
  clamp,
  computeMotionMs,
  computeVisualPercent,
  prefersReducedMotion,
} from "@/shared/components/bar-graph/bar-graph-01/utils/bar-graph-01";
import { useBarGraphMotion } from "@/shared/components/bar-graph/bar-graph-01/hooks/use-bar-graph-motion";

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
  showMinFillOnZero?: boolean;
  showTip?: boolean;
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
  showMinFillOnZero = false,
  showTip,
  replayKey,
}: BarGraph01Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const rawPercent = clamp(percent, 0, 100);
  const targetVisualPercent = computeVisualPercent({
    rawPercent,
    minPercent,
    maxPercent,
  });

  const showFill = rawPercent > 0 || showMinFillOnZero;
  const shouldShowTip = showTip ?? rawPercent > 0;

  const reduced = prefersReducedMotion();
  const motionMs = reduced ? 0 : computeMotionMs(rawPercent);

  useBarGraphMotion({
    rootRef,
    fillPercentVar: s.fillPercentVar,
    hasProgress: showFill,
    animate,
    animateFromZeroOnMount,
    replayKey,
    targetVisualPercent,
  });

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
      {showFill && <div className={s.fill} aria-hidden />}
      {showFill && shouldShowTip && <div className={s.tip} aria-hidden />}
      {label && <span className={s.label}>{label}</span>}
    </div>
  );
};

export default BarGraph01;
