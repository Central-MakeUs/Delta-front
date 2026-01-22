"use client";

import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useMemo } from "react";
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
  const values = rows.map((r) => toSafeNumber(r.value));
  const computedMin = Math.min(...values, 0);
  const computedMax = Math.max(...values, 0);

  const domainMin = toSafeNumber(minValue ?? computedMin);
  const domainMax = toSafeNumber(maxValue ?? computedMax);

  const safeMin = Math.min(domainMin, domainMax);
  const safeMax = Math.max(domainMin, domainMax);
  const range = Math.max(1, safeMax - safeMin);

  const rowsKey = useMemo(
    () => rows.map((r) => `${r.id}:${toSafeNumber(r.value)}`).join("|"),
    [rows]
  );

  const animationSeed = useMemo(() => {
    if (!animate) return "static";
    return `${String(replayKey ?? "")}-${rowsKey}`;
  }, [animate, replayKey, rowsKey]);

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
        <div className={s.barsColumn}>
          {rows.map((row) => {
            const raw = toSafeNumber(row.value);
            const safeValue = clamp(raw, safeMin, safeMax);
            const ratio = clamp((safeValue - safeMin) / range, 0, 1);

            const targetWidthRem = clamp(
              minBarWidthRem + ratio * (maxBarWidthRem - minBarWidthRem),
              minBarWidthRem,
              maxBarWidthRem
            );

            const isActive = (row.tone ?? "inactive") === "active";
            const labelText = row.valueLabel ?? formatValueLabel(raw);

            return (
              <div
                // ✅ seed가 바뀌면 리마운트 → keyframes가 “데이터 반영 후” 다시 실행됨
                key={`${row.id}-${animationSeed}`}
                className={s.bar({
                  tone: row.tone ?? "inactive",
                  animate: animate ? "on" : "off",
                })}
                style={assignInlineVars({
                  [s.barWidthFromVar]: `${minBarWidthRem}rem`,
                  [s.barWidthToVar]: `${targetWidthRem}rem`,
                })}
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
