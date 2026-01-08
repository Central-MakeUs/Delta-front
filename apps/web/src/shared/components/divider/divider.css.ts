import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const divider = recipe({
  base: {
    flexShrink: 0,
  },

  variants: {
    width: {
      full: { width: "100%" },
      hug: {
        alignSelf: "flex-start",
      },
    },
    height: {
      base: { height: "0.4rem" },
      hairline: { height: "0.1rem" },
    },
  },

  defaultVariants: {
    width: "full",
    height: "base",
  },
});

export const stack = style([
  bgColor["grayscale-0"],
  {
    padding: "2.0rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
  },
]);

export const label = style([typo.caption.medium, color["grayscale-500"]]);
