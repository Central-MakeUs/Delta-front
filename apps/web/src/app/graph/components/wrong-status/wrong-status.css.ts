import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const root = style([
  bgColor["grayscale-50"],
  {
    padding: "0.6rem 0.8rem",
    width: "fit-content",
    borderRadius: vars.radius.r8,
    display: "flex",
    alignItems: "center",
    gap: "1.6rem",
  },
]);

export const item = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const swatch = recipe({
  base: {
    width: "1.6rem",
    height: "1.6rem",
    borderRadius: vars.radius.r4,
    flexShrink: 0,
  },
  variants: {
    state: {
      done: bgColor["main-400"],
      before: bgColor["grayscale-100"],
    },
  },
  defaultVariants: {
    state: "before",
  },
});

export const label = style([typo.caption.medium, color["grayscale-500"]]);
