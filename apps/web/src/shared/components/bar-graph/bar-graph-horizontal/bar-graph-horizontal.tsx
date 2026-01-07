"use client";

import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import * as s from "./bar-graph-horizontal.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

type BarRow = {
  value: number;
  valueLabel: string;
  tone?: "active" | "inactive";
};

type BarGraphHorizontalProps = {
  label: string;
  rows: readonly [BarRow, ...BarRow[]];
  maxValue?: number;

  /** 보정용: bar 길이 최소/최대(rem) */
  minBarWidthRem?: number;
  maxBarWidthRem?: number;

  className?: string;
  ariaLabel?: string;
  showConnector?: boolean;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const toSafeNumber = (v: number) => (Number.isFinite(v) ? v : 0);

export const BarGraphHorizontal = ({
  label,
  rows,
  maxValue,
  minBarWidthRem = 12.0,
  maxBarWidthRem = 22.6,
  className,
  ariaLabel = "bar graph horizontal",
  showConnector = true,
}: BarGraphHorizontalProps) => {
  const values = rows.map((r) => toSafeNumber(r.value));
  const computedMax = Math.max(...values, 0);
  const safeMax = Math.max(1, toSafeNumber(maxValue ?? computedMax));

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

      {showConnector ? <div className={s.connector} aria-hidden /> : null}

      <div className={s.barsArea}>
        <div className={s.barsColumn}>
          {rows.map((row, idx) => {
            const raw = toSafeNumber(row.value);
            const safeValue = clamp(raw, 0, safeMax);
            const ratio = clamp(safeValue / safeMax, 0, 1);

            /* 최솟값/최댓값 보정: 0이어도 최소 길이 보장 + 최대 길이 제한 */
            const widthRem = clamp(
              minBarWidthRem + ratio * (maxBarWidthRem - minBarWidthRem),
              minBarWidthRem,
              maxBarWidthRem
            );

            const isActive = (row.tone ?? "inactive") === "active";

            return (
              <div
                key={`${row.valueLabel}-${idx}`}
                className={s.bar({ tone: row.tone ?? "inactive" })}
                style={assignInlineVars({ [s.barWidthVar]: `${widthRem}rem` })}
              >
                <div className={s.chip}>
                  <span
                    className={clsx(
                      typo.caption.semibold,
                      isActive ? color["main-600"] : color["grayscale-900"]
                    )}
                  >
                    {row.valueLabel}
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
