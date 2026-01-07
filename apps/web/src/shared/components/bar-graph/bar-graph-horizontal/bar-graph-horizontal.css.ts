import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";

export const barWidthVar = createVar();

export const root = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
});

export const labelArea = style({
  minWidth: "9.4rem",
  display: "flex",
  alignItems: "center",
});

export const connector = style({
  position: "relative",
  width: "0.2rem",
  backgroundColor: vars.color.grayscale[200],
  alignSelf: "stretch",

  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: "-1.2rem",
      top: "50%",
      transform: "translateY(-50%)",
      width: "1.2rem",
      height: "0.2rem",
      backgroundColor: vars.color.grayscale[200],
    },
  },
});

export const barsArea = style({
  flex: 1,
  display: "flex",
});

export const barsColumn = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
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
      active: {
        backgroundColor: vars.color.main[400],
      },
      inactive: {
        backgroundColor: vars.color.grayscale[200],
      },
    },
  },

  defaultVariants: {
    tone: "inactive",
  },
});

export const chip = style({
  padding: "0.4rem 0.8rem",
  backgroundColor: vars.color.bg,
  borderRadius: "24px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
