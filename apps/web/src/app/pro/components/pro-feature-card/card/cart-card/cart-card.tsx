import clsx from "clsx";
import { vars } from "@/shared/styles/theme.css";
import * as s from "./cart-card.css";

type Props = {
  className?: string;
  title?: string;
  bars: number[];
  line: number[];
};

const clamp01 = (v: number) => Math.max(0, Math.min(100, v));

const BAR_MAX_REM = 6.1;
const GRID_COUNT = 10;

const W = 133.5;
const H = 57;

const X = Array.from({ length: GRID_COUNT }, (_, i) =>
  Number(((i * (W - 0)) / (GRID_COUNT - 1)).toFixed(2))
);

const DOT_GRID_INDEX = [0, 2, 4, 6, 8, 9];

const toRem = (n: number) => `${n}rem`;

const ChartCard = ({
  className,
  title = "가장 많이 틀린 유형",
  bars,
  line,
}: Props) => {
  const safeBars = bars.slice(0, 4).map(clamp01);

  const safeLine = line.slice(0, 6).map(clamp01);

  const barHeights = safeBars.map((v) =>
    toRem(Number(((v / 100) * BAR_MAX_REM).toFixed(2)))
  );

  const ys = safeLine.map((v) => Number(((1 - v / 100) * H).toFixed(2)));

  const pathPoints = DOT_GRID_INDEX.map((gridIdx, i) => ({
    x: X[gridIdx] ?? 0,
    y: ys[i] ?? H,
  }));

  const d = pathPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className={clsx(s.card, className)}>
      <p className={s.title}>{title}</p>

      <div className={s.bars} aria-hidden="true">
        <div
          className={clsx(s.bar, s.barGray)}
          style={{ height: barHeights[0] ?? "0rem" }}
        />
        <div
          className={clsx(s.bar, s.barGray)}
          style={{ height: barHeights[1] ?? "0rem" }}
        />
        <div
          className={clsx(s.bar, s.barGray)}
          style={{ height: barHeights[2] ?? "0rem" }}
        />
        <div
          className={clsx(s.bar, s.barAccent)}
          style={{ height: barHeights[3] ?? "0rem" }}
        />
      </div>

      <div className={s.divider} aria-hidden="true" />

      <div className={s.lineBox} aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} className={s.lineSvg}>
          {X.map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={0}
              x2={x}
              y2={H}
              className={s.gridLine}
              stroke={vars.color.grayscale[50]}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path
            d={d}
            className={s.linePath}
            vectorEffect="non-scaling-stroke"
          />

          {pathPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              className={s.dot}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ChartCard;
