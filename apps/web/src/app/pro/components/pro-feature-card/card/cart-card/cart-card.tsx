"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
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
const W = 137;
const H = 76;

const DOT_R = 1.5;
const DOT_STROKE = 1.5;
const DOT_PAD = DOT_R + DOT_STROKE / 2;

const X_MIN = DOT_PAD;
const X_MAX = W - DOT_PAD;

const X = Array.from({ length: GRID_COUNT }, (_, i) =>
  Number((X_MIN + (i * (X_MAX - X_MIN)) / (GRID_COUNT - 1)).toFixed(2))
);

const DOT_GRID_INDEX = [0, 2, 4, 6, 8, 9];

const toRem = (n: number) => `${n}rem`;

const ChartCard = ({
  className,
  title = "가장 많이 틀린 유형",
  bars,
  line,
}: Props) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const safeBars = bars.slice(0, 4).map(clamp01);
  const safeLine = line.slice(0, 6).map(clamp01);

  const barHeights = safeBars.map((v) =>
    toRem(Number(((v / 100) * BAR_MAX_REM).toFixed(2)))
  );

  const ys = safeLine.map((v) => Number(((1 - v / 100) * H).toFixed(2)));

  const pathPoints = useMemo(
    () =>
      DOT_GRID_INDEX.map((gridIdx, i) => ({
        x: X[gridIdx] ?? X_MIN,
        y: ys[i] ?? H,
      })),
    [ys]
  );

  const d = useMemo(
    () =>
      pathPoints
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" "),
    [pathPoints]
  );

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    el.style.setProperty("--dash", String(len));

    requestAnimationFrame(() => setMounted(true));
  }, [d]);

  return (
    <div className={clsx(s.card, mounted && s.introOn, className)}>
      <div className={s.surface}>
        <div className={s.glow} />
        <div className={s.sheen} />

        <p className={s.title}>{title}</p>

        <div className={s.bars} aria-hidden="true">
          <div
            className={clsx(s.bar, s.barGray, mounted && s.barsOn)}
            style={{ height: barHeights[0] ?? "0rem" }}
          />
          <div
            className={clsx(s.bar, s.barGray, mounted && s.barsOn)}
            style={{ height: barHeights[1] ?? "0rem" }}
          />
          <div
            className={clsx(s.bar, s.barGray, mounted && s.barsOn)}
            style={{ height: barHeights[2] ?? "0rem" }}
          />
          <div
            className={clsx(s.bar, s.barAccent, mounted && s.barsOn)}
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
              ref={pathRef}
              d={d}
              className={clsx(s.linePath, mounted && s.lineOn)}
              vectorEffect="non-scaling-stroke"
            />

            {pathPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={DOT_R}
                className={clsx(s.dot, mounted && s.dotOn)}
                vectorEffect="non-scaling-stroke"
                style={{ transitionDelay: `${240 + i * 70}ms` }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
