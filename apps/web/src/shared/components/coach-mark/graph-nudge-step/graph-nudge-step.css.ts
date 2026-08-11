import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const dock = style({
  position: "fixed",
  left: "50%",
  bottom: "calc(7.2rem + env(safe-area-inset-bottom))",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  zIndex: vars.zIndex.coachMark,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "1.2rem",
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style({
  pointerEvents: "auto",
});
