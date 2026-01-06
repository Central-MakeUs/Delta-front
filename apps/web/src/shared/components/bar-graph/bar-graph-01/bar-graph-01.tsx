import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01.css";

type BarGraph01Props = {
  current: number;
  total: number;
  className?: string;
  ariaLabel?: string;
  tipOverlapRem?: number;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const BarGraph01 = ({
  current,
  total,
  className,
  ariaLabel = "progress",
  tipOverlapRem = 1.2,
}: BarGraph01Props) => {
  const safeTotal = total > 0 ? total : 1;
  const safeCurrent = clamp(current, 0, safeTotal);

  const percent = clamp((safeCurrent / safeTotal) * 100, 0, 100);
  const label = `${safeCurrent}/${safeTotal}`;

  const showTip = percent > 0;

  return (
    <div
      className={clsx(s.root, className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={safeTotal}
      aria-valuenow={safeCurrent}
      style={assignInlineVars({
        [s.fillPercentVar]: `${percent}%`,
        [s.tipOverlapVar]: `${tipOverlapRem}rem`,
      })}
    >
      <div className={s.track} aria-hidden />
      {percent > 0 && <div className={s.fill} aria-hidden />}
      {showTip && <div className={s.tip} aria-hidden />}
      <span className={s.label}>{label}</span>
    </div>
  );
};

export default BarGraph01;
