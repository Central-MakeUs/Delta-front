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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [active, setActive] = useState(false);
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

  // 라인 길이 측정해서 dash 세팅
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.setProperty("--dash", String(len));
    // mount 애니메이션 트리거
    requestAnimationFrame(() => setMounted(true));
  }, [d]);

  const setPointerVars = (clientX: number, clientY: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const py = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);

    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);

    const rotY = (px - 0.5) * 10;
    const rotX = (0.5 - py) * 10;
    el.style.transform = `perspective(600px) rotateX(${rotX.toFixed(
      2
    )}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-0.2rem)`;
  };

  const resetTilt = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "20%");
  };

  return (
    <div
      ref={rootRef}
      className={clsx(s.card, active && s.interactiveOn, className)}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        resetTilt();
      }}
      onPointerMove={(e) => setPointerVars(e.clientX, e.clientY)}
      onPointerDown={(e) => setPointerVars(e.clientX, e.clientY)}
      style={{ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" }}
    >
      <div className={s.surface}>
        <div className={clsx(s.glow, active && s.glowOn)} />
        <div className={clsx(s.sheen, active && s.sheenOn)} />

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
                style={{
                  transitionDelay: `${240 + i * 70}ms`,
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
