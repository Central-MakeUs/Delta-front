import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const dock = style({
  position: "fixed",
  right: "3rem",
  bottom: "calc(6.5rem + env(safe-area-inset-bottom))",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  zIndex: vars.zIndex.bottomSheet,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "1.2rem",
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style({
  pointerEvents: "auto",
});
