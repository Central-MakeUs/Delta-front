import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const chip = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    whiteSpace: "nowrap",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",

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

  variants: {
    shape: {
      pill: { padding: "1.2rem 2.4rem", borderRadius: vars.radius.r48 },
      square: { padding: "0.8rem 1.6rem", borderRadius: vars.radius.r12 },
    },

    state: {
      default: [
        typo.body3.medium,
        color["grayscale-500"],
        bgColor["grayscale-50"],
      ],
      active: [typo.body3.semibold, color["main-500"], bgColor["main-100"]],
    },
  },

  defaultVariants: {
    shape: "pill",
    state: "default",
  },
});
