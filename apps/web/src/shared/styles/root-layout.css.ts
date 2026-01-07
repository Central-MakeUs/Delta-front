import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const fabDock = style({
  position: "fixed",
  left: "50%",
  bottom: "calc(8.7rem + env(safe-area-inset-bottom))",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  minWidth: "37rem",
  zIndex: 10,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: vars.space[4],
  pointerEvents: "none",
});
