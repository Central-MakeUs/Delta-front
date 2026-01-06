import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "@/shared/components/bar-graph/bar-graph-02/bar-graph-02.css";

type BarGraph02Props = {
  valueLabel: string;
  heightRem?: number;
  tone?: "active" | "inactive";
  className?: string;
};

const BarGraph02 = ({
  valueLabel,
  heightRem = 12,
  tone = "active",
  className,
}: BarGraph02Props) => {
  return (
    <div
      className={clsx(s.bar({ tone }), className)}
      style={assignInlineVars({ [s.barHeightVar]: `${heightRem}rem` })}
    >
      <div className={s.chip}>
        <span className={s.chipText}>{valueLabel}</span>
      </div>
    </div>
  );
};

export default BarGraph02;
