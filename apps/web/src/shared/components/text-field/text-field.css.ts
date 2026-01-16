import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const container = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    flex: 1,
    flexGrow: 1,
    minHeight: 0,
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

export const textareaWrapper = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      display: "flex",
      flexDirection: "column",
      alignSelf: "stretch",
      border: `1px solid ${vars.color.grayscale[100]}`,
      borderRadius: vars.radius.md,
      flex: 1,
      padding: "1.6rem",
      gap: "0.8rem",
      position: "relative",
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
    size: {
      lg: {
        minHeight: "17.6rem",
      },
      md: {
        maxHeight: "5.6rem",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    size: "md",
  },
});

export const prefix = style({
  display: "flex",
  alignItems: "center",
  flex: "none",
  order: 0,
  flexGrow: 0,
});

export const textarea = recipe({
  base: [
    color["grayscale-700"],
    typo.body2.regular,
    {
      outline: "none",
      flex: 1,
      flexGrow: 1,
      width: "100%",
      border: "none",
      background: "transparent",
      resize: "none",
      fontFamily: "inherit",
      selectors: {
        "&::placeholder": {
          color: vars.color.grayscale[700],
        },
        "&:disabled": {
          cursor: "not-allowed",
          color: vars.color.grayscale[400],
        },
      },
    },
  ],
  variants: {
    hasPrefix: {
      true: {
        order: 1,
        alignSelf: "stretch",
        flexGrow: 1,
      },
      false: {},
    },
    fontSize: {
      body1: typo.body1.medium,
      body2: typo.body2.medium,
      body3: typo.body3.medium,
    },
  },
  defaultVariants: {
    hasPrefix: false,
    fontSize: "body3",
  },
});
