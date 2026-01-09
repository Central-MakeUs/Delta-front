import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const label = style({
  whiteSpace: "nowrap",
  wordBreak: "keep-all",
});

export const chip = recipe({
  base: {
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    maxWidth: "100%",
    flex: "0 0 auto",
    transition:
      "background-color 140ms ease, color 140ms ease, opacity 140ms ease",

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
    fullWidth: {
      true: { width: "100%" },
      false: { width: "fit-content" },
    },

    size: {
      xs: typo.captionXs,
      md: typo.caption.semibold,
      lg: typo.body3.medium,
    },

    shape: {
      pill: {},
      square: {},
    },

    state: {
      default: [bgColor["grayscale-50"], color["grayscale-700"]],
      active: [bgColor["main-100"], color["main-500"]],
    },

    /**
     * - auto: 기존 state 그대로
     * - solid: 공통수학1 같은 "메인 솔리드"
     * - white / white-accent: 10개 / 8개 같은 하얀 배경 칩
     * - surface: state 무시하고 항상 회색 서피스
     * - soft: state 무시하고 항상 메인 soft
     */
    tone: {
      auto: {},
      surface: [bgColor["grayscale-50"], color["grayscale-700"]],
      soft: [bgColor["main-100"], color["main-500"]],
      solid: [bgColor["main-500"], color["grayscale-0"]],
      white: [bgColor["grayscale-0"], color["grayscale-900"]],
      "white-accent": [bgColor["grayscale-0"], color["main-500"]],
    },
  },

  compoundVariants: [
    // -------- padding + radius (size x shape) --------
    // lg
    {
      variants: { size: "lg", shape: "pill" },
      style: { padding: "1.2rem 2.4rem", borderRadius: vars.radius.r48 },
    },
    {
      variants: { size: "lg", shape: "square" },
      style: { padding: "0.8rem 1.6rem", borderRadius: vars.radius.r12 },
    },

    // md
    {
      variants: { size: "md", shape: "pill" },
      style: { padding: "0.4rem 1.2rem", borderRadius: vars.radius.r24 },
    },
    {
      variants: { size: "md", shape: "square" },
      style: { padding: "0.4rem 1.2rem", borderRadius: vars.radius.r8 },
    },

    // xs
    {
      variants: { size: "xs", shape: "pill" },
      style: { padding: "0.4rem 0.8rem", borderRadius: vars.radius.r24 },
    },
    {
      variants: { size: "xs", shape: "square" },
      style: { padding: "0.4rem 0.8rem", borderRadius: vars.radius.r6 },
    },

    // -------- typography weight tweaks --------
    // lg active는 600
    {
      variants: { size: "lg", state: "active", tone: "auto" },
      style: typo.body3.semibold,
    },
    // lg active + soft 강제도 600
    {
      variants: { size: "lg", tone: "soft" },
      style: typo.body3.semibold,
    },

    // -------- xs surface 텍스트는 더 진하게 (#30323D) --------
    {
      variants: { size: "xs", tone: "auto", state: "default" },
      style: color["grayscale-900"],
    },
    {
      variants: { size: "xs", tone: "surface" },
      style: color["grayscale-900"],
    },
  ],

  defaultVariants: {
    size: "lg",
    shape: "pill",
    state: "default",
    tone: "auto",
    fullWidth: false,
  },
});

export type ChipVariants = RecipeVariants<typeof chip>;
