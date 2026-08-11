import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const FAB_SIZE = "6.4rem";
export const FAB_DOCK_BOTTOM = "calc(8.7rem + env(safe-area-inset-bottom))";

export const fabButton = style({
  width: FAB_SIZE,
  height: FAB_SIZE,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.main[500],
  boxShadow: vars.shadow.e400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.grayscale[0],
  cursor: "pointer",
  pointerEvents: "auto",
});

export const icon = style({
  flexShrink: 0,
  display: "block",
});

export const fabDock = style({
  position: "fixed",
  left: "50%",
  bottom: FAB_DOCK_BOTTOM,
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  minWidth: "37rem",
  zIndex: vars.zIndex.fab,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: vars.space[4],
  pointerEvents: "none",
});
