import { style } from "@vanilla-extract/css";

export const page = style({
  position: "relative",
  paddingLeft: "2.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  paddingTop: "env(safe-area-inset-top)",
  paddingBottom: "env(safe-area-inset-bottom)",
});

export const textBlock = style({
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  gap: "0.8rem",
});

export const actions = style({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  paddingBottom: "1.6rem",
  gap: "1.6rem",
});
