import { recipe } from "@vanilla-extract/recipes";
import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const gapVar = createVar();
export const paddingXVar = createVar();
export const paddingYVar = createVar();
export const radiusVar = createVar();

export const icon = style({
  flexShrink: 0,
  display: "block",
});

export const button = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    gap: gapVar,
    padding: `${paddingYVar} ${paddingXVar}`,
    borderRadius: radiusVar,
    transition:
      "background-color 180ms cubic-bezier(0.2, 0, 0, 1), color 180ms cubic-bezier(0.2, 0, 0, 1)",

    vars: {
      [gapVar]: "0.8rem",
      [paddingXVar]: "1.2rem",
      [paddingYVar]: "0.8rem",
      [radiusVar]: vars.radius.r12,
    },

    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
      },
    },

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },

  variants: {
    size: {
      "32": {
        minHeight: "3.2rem",
        vars: {
          [paddingYVar]: "0.6rem",
          [paddingXVar]: "1.2rem",
          [radiusVar]: vars.radius.r8,
          [gapVar]: "0.6rem",
        },
      },
      "40": {
        minHeight: "4.0rem",
        vars: {
          [paddingYVar]: "0.8rem",
          [paddingXVar]: "1.2rem",
          [radiusVar]: vars.radius.r8,
          [gapVar]: "0.8rem",
        },
      },
      "48": {
        minHeight: "4.8rem",
        vars: {
          [paddingYVar]: "0.8rem",
          [paddingXVar]: "1.2rem",
          [radiusVar]: vars.radius.r12,
          [gapVar]: "0.8rem",
        },
      },
      "56": {
        minHeight: "6.0rem",
        vars: {
          [paddingYVar]: "0.8rem",
          [paddingXVar]: "1.2rem",
          [radiusVar]: vars.radius.r12,
          [gapVar]: "0.8rem",
        },
      },
      "60": {
        minHeight: "6.0rem",
        vars: {
          [paddingYVar]: "0.8rem",
          [paddingXVar]: "1.2rem",
          [radiusVar]: vars.radius.r12,
          [gapVar]: "0.8rem",
        },
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
