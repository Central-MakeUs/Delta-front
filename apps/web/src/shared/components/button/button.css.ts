import { recipe } from "@vanilla-extract/recipes";
import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

/** iconSize(rem)를 Button에서 style로 주입하기 위한 CSS 변수 */
export const iconSizeVar = createVar();

export const button = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    /* 텍스트/아이콘이 currentColor 따라가게 */
    color: "inherit",
    backgroundColor: "transparent",
    /* 공통 */
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
        gap: "1.2rem",
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
      "60": {
        minHeight: "6.0rem",
        padding: "0.8rem 1.2rem",
        borderRadius: vars.radius.r12,
        gap: "1.2rem",
      },
    },

    tone: {
      surface: {
        backgroundColor: vars.color.grayscale[50],
        color: vars.color.grayscale[700],
      },
      muted: {
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
      "32": {
        fontSize: vars.typography.caption.fontSize,
        fontWeight: vars.typography.caption.fontWeight.semibold,
        letterSpacing: vars.typography.caption.letterSpacing,
        lineHeight: vars.typography.caption.lineHeight,
      },
      "40": {
        fontSize: vars.typography.body3.fontSize,
        fontWeight: vars.typography.body3.fontWeight.semibold,
        letterSpacing: vars.typography.body3.letterSpacing,
        lineHeight: vars.typography.body3.lineHeight,
      },
      "48": {
        fontSize: vars.typography.button1.fontSize,
        fontWeight: vars.typography.button1.fontWeight,
        letterSpacing: vars.typography.button1.letterSpacing,
        lineHeight: vars.typography.button1.lineHeight,
      },
      "60": {
        fontSize: vars.typography.body1.fontSize,
        fontWeight: vars.typography.body1.fontWeight.bold,
        letterSpacing: vars.typography.body1.letterSpacing,
        lineHeight: vars.typography.body1.lineHeight,
      },
    },
  },
  defaultVariants: { size: "48" },
});

export const iconWrap = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  /* Button.tsx에서 iconSizeVar로 주입 */
  width: iconSizeVar,
  height: iconSizeVar,
  flexShrink: 0,
});
