import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 10,
});

export const overlayInner = style({
  width: "100%",
  maxWidth: "43rem",
  minWidth: "37rem",
  position: "relative",
});

export const fabWrapper = style({
  position: "absolute",
  right: vars.space[4],
  bottom: "calc(8.7rem + env(safe-area-inset-bottom))",
  pointerEvents: "auto",
  display: "flex",
});
