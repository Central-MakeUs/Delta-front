import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "transparent",
  zIndex: vars.zIndex.modal,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "1.6rem",
  boxSizing: "border-box",
});

export const menu = style({
  width: "100%",
  boxShadow: vars.shadow.e400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

export const list = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const itemButton = style([
  bgColor["grayscale-0"],
  {
    width: "100%",
    appearance: "none",
    border: "none",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    paddingTop: "1.2rem",
    paddingBottom: "1.2rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    boxSizing: "border-box",
  },
  {
    selectors: {
      "&:first-child": {
        borderTopLeftRadius: vars.radius.r16,
        borderTopRightRadius: vars.radius.r16,
      },
      "&:last-child": {
        borderBottomLeftRadius: vars.radius.r16,
        borderBottomRightRadius: vars.radius.r16,
      },
    },
  },
]);

export const itemText = style([typo.body3.medium, color["grayscale-400"]]);
