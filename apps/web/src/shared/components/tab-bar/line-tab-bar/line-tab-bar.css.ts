import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const tabBar = recipe({
  base: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: `0.1rem solid ${vars.color.grayscale[50]}`,
  },

  variants: {
    size: {
      lg: {
        paddingTop: "1.1rem",
        paddingLeft: "1.6rem",
        gap: "0.8rem",
      },
    },
  },

  defaultVariants: {
    size: "lg",
  },
});

export const tabButton = recipe({
  base: {
    position: "relative",
    background: "transparent",
    border: "none",
    padding: "0.8rem",
    cursor: "pointer",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

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
    state: {
      active: {
        selectors: {
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-0.1rem",
            height: "0.2rem",
            backgroundColor: vars.color.grayscale[900],
          },
        },
      },
      inactive: {},
    },
  },

  defaultVariants: {
    state: "inactive",
  },
});

export const label = style({
  wordBreak: "keep-all",
});
