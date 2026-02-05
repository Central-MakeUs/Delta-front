import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingBottom: "8rem",
  minHeight: "100vh",
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 1.6rem",
  gap: "2.4rem",
  width: "100%",
  flex: "1 1 auto",
});

export const bottomButtonContainer = style({
  position: "fixed",
  maxWidth: "43rem",
  width: "100%",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  background: vars.color.grayscale[0],
  zIndex: vars.zIndex.bottomNav,
});

export const bottomButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  padding: "1.6rem",
  width: "100%",
});
