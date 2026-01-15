import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/bar-graph/bar-graph-02/bar-graph-02.css";

export type BarGraph02Props = {
  value: number;
  maxValue: number;
  valueLabel: string;
  tone?: "active" | "inactive";
  className?: string;
  showCrown?: boolean;
  maxHeightRem?: number;
  minHeightRem?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const BarGraph02 = ({
  value,
  maxValue,
  valueLabel,
  tone = "active",
  className,
  showCrown = false,
  maxHeightRem = 11.1,
  minHeightRem = 4,
}: BarGraph02Props) => {
  const safeMax = maxValue > 0 ? maxValue : 1;
  const safeValue = clamp(value, 0, safeMax);

  const ratio = clamp(safeValue / safeMax, 0, 1);
  const range = Math.max(maxHeightRem - minHeightRem, 0);
  const heightRem = minHeightRem + range * ratio;

  return (
    <div
      className={clsx(s.bar({ tone }), className)}
      style={assignInlineVars({ [s.barHeightVar]: `${heightRem}rem` })}
    >
      <div className={s.topStack}>
        {showCrown ? <Icon name="target" size={1.6} /> : null}
        <div className={s.chip}>
          <span className={s.chipText}>{valueLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default BarGraph02;
