import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

export const container = style({
  width: "100%",
  flexDirection: "column",
  display: "flex",
  gap: "2rem",
  selectors: {
    "&": {
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const chipGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1.2rem",
  padding: "0 1.6rem",
});

export const icon = style([color["grayscale-700"]]);

export const checkSection = style({
  flexDirection: "column",
  gap: "1.2rem",
  display: "flex",
});

export const checkTitleSection = style({
  alignItems: "center",
  gap: "0.8rem",
  display: "flex",
  padding: "0 1.6rem",
});

export const checkTitle = style([typo.body2.medium, color["grayscale-700"]]);

export const checkList = style({
  alignItems: "center",
  gap: "1.6rem",
  padding: "0 1.6rem",
  display: "flex",
});

export const buttonGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: "1.2rem",
  rowGap: "1.6rem",
  padding: "0 1.6rem",
});

export const dividerReveal = recipe({
  base: {
    overflow: "hidden",
    maxHeight: 0,
    opacity: 0,
    transform: "translateY(0.8rem)",
    pointerEvents: "none",
    willChange: "max-height, opacity, transform",
    transition:
      "max-height 220ms cubic-bezier(0.2, 0, 0, 1), opacity 180ms cubic-bezier(0.2, 0, 0, 1), transform 220ms cubic-bezier(0.2, 0, 0, 1)",

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
        transform: "none",
      },
    },
  },
  variants: {
    open: {
      true: {
        maxHeight: "2.0rem",
        opacity: 1,
        transform: "translateY(0)",
        pointerEvents: "auto",
      },
      false: {},
    },
  },
  defaultVariants: { open: false },
});

export const checkReveal = recipe({
  base: {
    overflow: "hidden",
    maxHeight: 0,
    opacity: 0,
    transform: "translateY(10rem)",
    pointerEvents: "none",
    willChange: "max-height, opacity, transform",

    transition:
      "max-height 360ms cubic-bezier(0.2, 0, 0, 1), opacity 220ms cubic-bezier(0.2, 0, 0, 1) 60ms, transform 450ms cubic-bezier(0.2, 0, 0, 1) 60ms",

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
        transform: "none",
      },
    },
  },
  variants: {
    open: {
      true: {
        maxHeight: "40rem",
        opacity: 1,
        transform: "translateY(0)",
        pointerEvents: "auto",
      },
      false: {},
    },
  },
  defaultVariants: { open: false },
});

export const step4Container = style({
  alignItems: "center",
  gap: "2.4rem",
  padding: "0 1.6rem",
  display: "flex",
  flexDirection: "column",
});

export const image = style({
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: vars.radius.r12,
  border: `0.1rem solid ${vars.color.grayscale[50]}`,
});

export const explanationTitle = style([
  typo.body2.semibold,
  color["grayscale-700"],
  { width: "100%" },
]);

export const explanationSection = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  alignItems: "stretch",
});

export const explanationContent = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  alignItems: "stretch",
});

export const numberTitleRow = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
