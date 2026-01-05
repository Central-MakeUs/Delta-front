import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const container = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
    userSelect: "none",
  },
});

export const input = style({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  pointerEvents: "none",
});

export const checkbox = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.4rem",
    height: "2.4rem",
    flexShrink: 0,
    gap: "1rem",
    padding: "1rem",
    backgroundColor: vars.color.grayscale[50],
    borderRadius: vars.radius.r4,
    transition: "all 0.2s ease",
    cursor: "pointer",

    selectors: {
      [`${input}:checked + &`]: {
        borderColor: vars.color.main[500],
        backgroundColor: vars.color.main[500],
        color: vars.color.grayscale[0],
      },
      [`${input}:focus-visible + &`]: {
        outline: `0.2rem solid ${vars.color.main[500]}`,
        outlineOffset: "0.2rem",
      },
    },
  },
});

export const icon = recipe({
  base: {
    position: "relative",
    display: "block",
    width: "1.6rem",
    height: "1.6rem",
    marginTop: "-0.6rem",
    marginBottom: "-0.6rem",
    marginLeft: "-0.6rem",
    marginRight: "-0.6rem",
    color: vars.color.grayscale[400],
    flexShrink: 0,

    selectors: {
      [`${input}:checked + ${checkbox()} &`]: {
        color: vars.color.grayscale[0],
      },
      [`${input}:checked:disabled + ${checkbox()} &`]: {
        color: vars.color.grayscale[400],
      },
    },
  },
});

export const labelText = recipe({
  base: {
    color: vars.color.grayscale[900],
    cursor: "pointer",
    display: "inline-block",

    selectors: {
      [`${input}:disabled ~ &`]: {
        color: vars.color.grayscale[400],
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      md: typo.body2.regular,
    },
  },

  defaultVariants: {
    size: "md",
  },
});

