import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01.css";

type BarGraph01Props = {
  percent: number;
  className?: string;
  ariaLabel?: string;
  tipOverlapRem?: number;
  label?: string;
  minPercent?: number;
  maxPercent?: number;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const BarGraph01 = ({
  percent,
  className,
  ariaLabel = "progress",
  tipOverlapRem = 1.2,
  label,
  minPercent = 10,
  maxPercent = 85,
}: BarGraph01Props) => {
  const rawPercent = clamp(percent, 0, 100);

  const min = clamp(minPercent, 0, 100);
  const max = clamp(maxPercent, 0, 100);
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const visualPercent = lo + (rawPercent / 100) * (hi - lo);
  const showTip = visualPercent > 0;

  return (
    <div
      className={clsx(s.root, className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={rawPercent}
      style={assignInlineVars({
        [s.fillPercentVar]: `${visualPercent}%`,
        [s.tipOverlapVar]: `${tipOverlapRem}rem`,
      })}
    >
      <div className={s.track} aria-hidden />
      {visualPercent > 0 && <div className={s.fill} aria-hidden />}
      {showTip && <div className={s.tip} aria-hidden />}
      {label && <span className={s.label}>{label}</span>}
    </div>
  );
};

export default BarGraph01;
