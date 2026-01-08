import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const button = recipe({
  base: [
    typo.body3.medium,
    color["grayscale-500"],
    {
      border: "none",
      cursor: "pointer",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      gap: "0.8rem",
      padding: "0.8rem 1.2rem",
      borderRadius: vars.radius.r8,

      selectors: {
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.5,
        },
        "&:focus-visible": {
          outline: `0.2rem solid ${vars.color.main[200]}`,
          outlineOffset: "0.2rem",
        },
      },
    },
  ],

  variants: {
    background: {
      transparent: {
        backgroundColor: "transparent",
        padding: 0,
      },
      filled: bgColor["grayscale-50"],
    },
    iconPosition: {
      left: { flexDirection: "row" },
      right: { flexDirection: "row-reverse" },
    },
  },
  defaultVariants: {
    background: "filled",
    iconPosition: "left",
  },
});

export const icon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const label = style({
  whiteSpace: "nowrap",
});
