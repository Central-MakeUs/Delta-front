import { recipe } from "@vanilla-extract/recipes";
import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const iconSizeVar = createVar();

export const icon = style({
  flexShrink: 0,
  display: "block",
});

export const button = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "inherit",
    backgroundColor: "transparent",
    borderRadius: vars.radius.r12,
    gap: "0.8rem",
    padding: "0.8rem 1.2rem",

    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        backgroundColor: vars.color.grayscale[100],
        color: vars.color.grayscale[500],
      },
    },
  },

  variants: {
    size: {
      "32": {
        minHeight: "3.2rem",
        padding: "0.6rem 1.2rem",
        borderRadius: vars.radius.r8,
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

    tone: {
      surface: {
        backgroundColor: vars.color.grayscale[50],
        color: vars.color.grayscale[700],
      },
      default: {
        backgroundColor: vars.color.grayscale[100],
        color: vars.color.grayscale[800],
      },
      dark: {
        backgroundColor: vars.color.grayscale[900],
        color: vars.color.grayscale[0],
      },
      kakao: {
        backgroundColor: vars.color.login.kakao,
        color: vars.color.grayscale[900],
      },
    },

    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
  },

  defaultVariants: {
    size: "48",
    tone: "surface",
    fullWidth: false,
  },
});

export const label = recipe({
  base: {
    color: "inherit",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      "32": typo.caption.semibold,
      "40": typo.body3.semibold,
      "48": typo.button1,
      "56": typo.body2.medium,
      "60": typo.body1.bold,
    },
  },
  defaultVariants: { size: "48" },
});
