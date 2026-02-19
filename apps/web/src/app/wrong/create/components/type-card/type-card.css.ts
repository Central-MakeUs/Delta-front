import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";
import { color } from "@/shared/styles/color.css";

export const typeCard = recipe({
  base: [
    typo.body2.medium,
    {
      width: "100%",
      minHeight: "5.6rem",
      padding: "1.6rem",
      borderRadius: vars.radius.r12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      outline: "none",
      userSelect: "none",
      selectors: {
        "&:focus-visible": {
          boxShadow: `0 0 0 0.2rem ${vars.color.grayscale[200]}`,
        },
      },
    },
  ],
  variants: {
    tone: {
      surface: {
        background: vars.color.grayscale[50],
        color: vars.color.grayscale[700],
      },
      dark: {
        background: vars.color.grayscale[900],
        color: vars.color.grayscale[0],
      },
    },
    disabled: {
      true: { opacity: 0.4, cursor: "default" },
      false: {},
    },
  },
  defaultVariants: {
    tone: "surface",
    disabled: false,
  },
});

export const typeCardAction = style([
  color["grayscale-400"],
  {
    width: "2.4rem",
    height: "2.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    position: "relative",
    zIndex: vars.zIndex.contentOverlayHigh,
  },
]);

export const typeCardActionDisabled = style({
  cursor: "default",
});

export const typeCardHitArea = style({
  position: "absolute",
  inset: 0,
  zIndex: vars.zIndex.contentOverlay,
  border: "none",
  background: "transparent",
  padding: 0,
  borderRadius: vars.radius.r12,
  cursor: "pointer",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 0.2rem ${vars.color.grayscale[200]}`,
    },
    "&:disabled": {
      cursor: "default",
    },
  },
});
