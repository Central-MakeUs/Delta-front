import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { bgColor } from "@/shared/styles/color.css";
import {
  LABEL_WIDTH_REM,
  GAP_REM,
} from "@/shared/components/bar-graph/bar-graph-horizontal/constants/bar-style";

export const barWidthVar = createVar();
const TRANSITION_MS = "800ms";
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export const root = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: `${GAP_REM}rem`,
});

export const labelArea = style({
  width: `${LABEL_WIDTH_REM}rem`,
  display: "flex",
  alignItems: "center",
});

export const barsArea = style({
  flex: 1,
  display: "flex",
});

export const barsColumn = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "1.1rem 0",
  gap: "1rem",
});

export const bar = recipe({
  base: [
    {
      vars: {
        [barWidthVar]: "0rem",
      },
      width: `min(100%, ${barWidthVar})`,
      padding: "0.4rem 0.8rem",
      borderRadius: "12px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "1rem",
      transitionProperty: "width",
      transitionDuration: TRANSITION_MS,
      transitionTimingFunction: EASING,
      willChange: "width",
      "@media": {
        "(prefers-reduced-motion: reduce)": {
          transitionDuration: "0ms",
        },
      },
    },
  ],
  variants: {
    tone: {
      active: bgColor["main-400"],
      inactive: bgColor["grayscale-200"],
    },
  },
  defaultVariants: { tone: "inactive" },
});

export const chip = style([
  bgColor["grayscale-0"],
  {
    padding: "0.4rem 0.8rem",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);
