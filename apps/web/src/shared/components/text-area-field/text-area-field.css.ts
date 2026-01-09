import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
  },
  variants: {
    fullWidth: {
      true: { width: "100%" },
      false: { width: "auto" },
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export const textareaWrapper = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      width: "100%",
      display: "flex",
      alignItems: "stretch",
      border: `0.1rem solid ${vars.color.grayscale[100]}`,
      borderRadius: vars.radius.r12,
      padding: "1.6rem",
      minHeight: "17.6rem",
      selectors: {
        "&:focus-within": {
          borderColor: vars.color.grayscale[400],
        },
      },
    },
  ],
  variants: {
    disabled: {
      true: {
        backgroundColor: vars.color.grayscale[100],
        borderColor: vars.color.grayscale[200],
        cursor: "not-allowed",
        opacity: 0.6,
      },
      false: {},
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const textarea = style([
  typo.body2.regular,
  color["grayscale-700"],
  {
    width: "100%",
    minHeight: "17.6rem",
    border: 0,
    outline: "none",
    padding: 0,
    margin: 0,
    resize: "none",
    background: "transparent",
    selectors: {
      "&::placeholder": {
        color: vars.color.grayscale[400],
      },
      "&:disabled": {
        cursor: "not-allowed",
        color: vars.color.grayscale[400],
      },
    },
  },
]);
