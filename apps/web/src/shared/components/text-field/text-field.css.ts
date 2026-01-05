import {  style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "3.375rem",
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
  base: {
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "stretch",
    backgroundColor: vars.color.grayscale[0],
    border: `0.1rem solid ${vars.color.grayscale[100]}`,
    borderRadius: vars.radius.r12,
    flex: 1,
    flexGrow: 1,
    justifyContent: "space-between",
    padding: "1.6rem 2.0rem",
    position: "relative",
    transition: "all 0.2s ease",

    selectors: {
      "&:focus-within": {
        borderColor: vars.color.main[500],
        outline: `0.2rem solid ${vars.color.main[500]}`,
        outlineOffset: "0.2rem",
      },
      "&:hover:not(:focus-within)": {
        borderColor: vars.color.grayscale[200],
      },
    },
  },
  variants: {
    error: {
      true: {
        borderColor: vars.color.error[500],
        selectors: {
          "&:focus-within": {
            borderColor: vars.color.error[500],
            outline: `0.2rem solid ${vars.color.error[500]}`,
          },
        },
      },
      false: {},
    },
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
    error: false,
    disabled: false,
  },
});

export const input = recipe({
  base: [
    typo.body2.regular,
    {
      color: vars.color.grayscale[900],
      backgroundColor: "transparent",
      border: "none",
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
    marginTop: "-0.0625rem", // -1px
    position: "relative",
  },
]);

