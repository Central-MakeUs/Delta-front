import { style } from "@vanilla-extract/css";

export const page = style({
  position: "relative",
  paddingLeft: "2.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  paddingBottom: "env(safe-area-inset-bottom)",
  boxSizing: "border-box",
  "@media": {
    "(min-height: 820px)": {
      height: "min(100dvh, 90rem)",
      justifyContent: "space-between",
      paddingBottom: "3.5rem",
      gap: 0,
    },
  },
});

export const bottomSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",

  "@media": {
    "(min-height: 820px)": {
      gap: "3.5rem",
    },
  },
});

export const textBlock = style({
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  gap: "0.8rem",
});

export const actions = style({
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  paddingBottom: "1.6rem",
  gap: "1.6rem",
});
