"use client";

import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useLayoutEffect, useRef } from "react";
import * as s from "./bar-graph-horizontal.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export type BarRow = {
  id: string;
  value: number;
  valueLabel?: string;
  tone?: "active" | "inactive";
};

type BarGraphHorizontalProps = {
  label: string;
  rows: readonly [BarRow, ...BarRow[]];
  minValue?: number;
  maxValue?: number;
  minBarWidthRem?: number;
  maxBarWidthRem?: number;
  className?: string;
  ariaLabel?: string;
  formatValueLabel?: (value: number) => string;
  animate?: boolean;
  replayKey?: string | number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const toSafeNumber = (v: number) => (Number.isFinite(v) ? v : 0);
const defaultFormatValueLabel = (value: number) => `${value}개`;

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

const BarGraphHorizontal = ({
  label,
  rows,
  minValue,
  maxValue,
  minBarWidthRem = 12.0,
  maxBarWidthRem = 22.6,
  className,
  ariaLabel = "bar graph horizontal",
  formatValueLabel = defaultFormatValueLabel,
  animate = true,
  replayKey,
}: BarGraphHorizontalProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);
  const prevReplayKeyRef = useRef<string | number | undefined>(undefined);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  const values = rows.map((r) => toSafeNumber(r.value));
  const computedMin = Math.min(...values, 0);
  const computedMax = Math.max(...values, 0);

  const domainMin = toSafeNumber(minValue ?? computedMin);
  const domainMax = toSafeNumber(maxValue ?? computedMax);

  const safeMin = Math.min(domainMin, domainMax);
  const safeMax = Math.max(domainMin, domainMax);
  const range = Math.max(1, safeMax - safeMin);

  const reduced = prefersReducedMotion();
  const shouldAnimate = animate && !reduced;

  const rowsKey = rows.map((r) => `${r.id}:${toSafeNumber(r.value)}`).join("|");

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || !shouldAnimate) return;

    const varName = toCssVarName(s.barWidthVar);

    if (raf1Ref.current) window.cancelAnimationFrame(raf1Ref.current);
    if (raf2Ref.current) window.cancelAnimationFrame(raf2Ref.current);
    raf1Ref.current = null;
    raf2Ref.current = null;

    const replayKeyChanged =
      replayKey !== undefined && replayKey !== prevReplayKeyRef.current;

    const shouldKick = replayKeyChanged || !mountedRef.current;

    mountedRef.current = true;
    prevReplayKeyRef.current = replayKey;

    const bars = el.querySelectorAll<HTMLElement>('[data-bar="horizontal"]');

    if (!shouldKick) {
      bars.forEach((node) => {
        const target = node.dataset.targetWidth ?? `${minBarWidthRem}rem`;
        node.style.setProperty(varName, target);
      });
      return;
    }

    bars.forEach((node) => {
      node.style.setProperty(varName, `${minBarWidthRem}rem`);
    });

    raf1Ref.current = window.requestAnimationFrame(() => {
      raf2Ref.current = window.requestAnimationFrame(() => {
        bars.forEach((node) => {
          const target = node.dataset.targetWidth ?? `${minBarWidthRem}rem`;
          node.style.setProperty(varName, target);
        });
      });
    });

    return () => {
      if (raf1Ref.current) window.cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current) window.cancelAnimationFrame(raf2Ref.current);
    };
  }, [shouldAnimate, replayKey, rowsKey, minBarWidthRem]);

  return (
    <div
      className={clsx(s.root, className)}
      role="group"
      aria-label={ariaLabel}
    >
      <div className={s.labelArea}>
        <span className={clsx(typo.body3.medium, color["grayscale-700"])}>
          {label}
        </span>
      </div>

      <div className={s.barsArea}>
        <div ref={rootRef} className={s.barsColumn}>
          {rows.map((row) => {
            const raw = toSafeNumber(row.value);
            const safeValue = clamp(raw, safeMin, safeMax);
            const ratio = clamp((safeValue - safeMin) / range, 0, 1);

            const widthRem = clamp(
              minBarWidthRem + ratio * (maxBarWidthRem - minBarWidthRem),
              minBarWidthRem,
              maxBarWidthRem
            );

            const isActive = (row.tone ?? "inactive") === "active";
            const labelText = row.valueLabel ?? formatValueLabel(raw);

            return (
              <div
                key={row.id}
                data-bar="horizontal"
                data-target-width={`${widthRem}rem`}
                className={s.bar({ tone: row.tone ?? "inactive" })}
                style={
                  shouldAnimate
                    ? undefined
                    : assignInlineVars({ [s.barWidthVar]: `${widthRem}rem` })
                }
              >
                <div className={s.chip}>
                  <span
                    className={clsx(
                      typo.caption.semibold,
                      isActive ? color["main-600"] : color["grayscale-900"]
                    )}
                  >
                    {labelText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarGraphHorizontal;
