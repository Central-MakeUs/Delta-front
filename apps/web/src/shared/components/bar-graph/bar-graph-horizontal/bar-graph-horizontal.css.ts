import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import {
  LABEL_WIDTH_REM,
  GAP_REM,
} from "@/shared/components/bar-graph/bar-graph-horizontal/constants/bar-style";

export const barWidthVar = createVar();

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
  base: {
    width: `min(100%, ${barWidthVar})`,
    padding: "0.4rem 0.8rem",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
  },
  variants: {
    tone: {
      active: { backgroundColor: vars.color.main[400] },
      inactive: { backgroundColor: vars.color.grayscale[200] },
    },
  },
  defaultVariants: { tone: "inactive" },
});

export const chip = style({
  padding: "0.4rem 0.8rem",
  backgroundColor: vars.color.bg,
  borderRadius: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
