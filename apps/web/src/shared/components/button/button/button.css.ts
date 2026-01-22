import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const icon = style({
  flexShrink: 0,
  display: "block",
});

export const tone = styleVariants({
  surface: [bgColor["grayscale-50"], color["grayscale-700"]],
  default: [bgColor["grayscale-100"], color["grayscale-800"]],
  dark: [bgColor["grayscale-900"], color["grayscale-0"]],
  kakao: [bgColor["login-kakao"], color["grayscale-900"]],
  complete: [bgColor["main-500"], color["grayscale-0"]],
  disabled: [bgColor["grayscale-100"], color["grayscale-500"]],
});

export const button = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,

    transition:
      "background-color 180ms cubic-bezier(0.2, 0, 0, 1), color 180ms cubic-bezier(0.2, 0, 0, 1)",

    selectors: {
      "&:disabled": { cursor: "not-allowed" },
    },

    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },

  variants: {
    size: {
      "32": {
        minHeight: "3.2rem",
        padding: "0.6rem 1.2rem",
        borderRadius: vars.radius.r8,
        gap: "0.6rem",
      },
      "40": {
        minHeight: "4.0rem",
        padding: "0.8rem 1.2rem",
        borderRadius: vars.radius.r8,
        gap: "0.8rem",
      },
      "48": {
        minHeight: "4.8rem",
        padding: "0.8rem 1.2rem",
        borderRadius: vars.radius.r12,
        gap: "0.8rem",
      },
      "56": {
        minHeight: "6.0rem",
        padding: "0.8rem 1.2rem",
        borderRadius: vars.radius.r12,
        gap: "0.8rem",
      },
      "60": {
        minHeight: "6.0rem",
        padding: "0.8rem 1.2rem",
        borderRadius: vars.radius.r12,
        gap: "0.8rem",
      },
    },

    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
  },

  defaultVariants: {
    size: "48",
    fullWidth: false,
  },
});

export const labelBase = style({
  color: "inherit",
  whiteSpace: "nowrap",
});

export const labelSizeTypo = recipe({
  variants: {
    size: {
      "32": typo.caption.semibold,
      "40": typo.body3.semibold,
      "48": typo.body2.semibold,
      "56": typo.body2.medium,
      "60": typo.body1.bold,
    },
  },
  defaultVariants: { size: "48" },
});
