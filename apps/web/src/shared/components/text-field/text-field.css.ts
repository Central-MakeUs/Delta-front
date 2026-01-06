import {  style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { recipe } from "@vanilla-extract/recipes";
import { bgColor, color } from "@/shared/styles/color.css";

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "5.4rem",
    position: "relative",
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: "auto",
      },
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export const inputWrapper = recipe({
  base: [
    bgColor["grayscale-0"],
    {
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "stretch",
    border: `0.1rem solid ${vars.color.grayscale[100]}`,
    borderRadius: vars.radius.md,
    flex: 1,
    flexGrow: 1,
    justifyContent: "space-between",
    padding: "1.6rem",
    position: "relative",
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

export const input = recipe({
  base: [
    typo.body2.regular,
    color["grayscale-900"],
    {
      outline: "none",
      flex: 1,
      width: "100%",
      padding: 0,
      margin: 0,
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
  ],
});

export const textWrapper = style([
  typo.body2.regular,
  {
    display: "flex",
    alignItems: "center",
    color: vars.color.grayscale[400],
    flex: 1,
    justifyContent: "center",
    marginTop: "-0.1rem", // -1px
    position: "relative",
  },
]);

