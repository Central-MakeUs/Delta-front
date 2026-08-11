import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import {
  FAB_DOCK_BOTTOM,
  FAB_SIZE,
} from "@/shared/components/button/fab-button/fab-button.css";

export const dim = style({
  position: "fixed",
  inset: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  zIndex: vars.zIndex.coachMark,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
});

export const dock = style({
  position: "fixed",
  left: "50%",
  bottom: FAB_DOCK_BOTTOM,
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  minWidth: "37rem",
  zIndex: vars.zIndex.coachMark,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1.2rem",
  paddingRight: vars.space[4],
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const fabWrap = style({
  position: "relative",
  width: FAB_SIZE,
  height: FAB_SIZE,
  flexShrink: 0,
  pointerEvents: "auto",
});

export const tooltip = style({
  pointerEvents: "auto",
});

export const hand = style({
  position: "absolute",
  right: "-0.8rem",
  bottom: "-2rem",
  transform: "rotate(-20deg)",
  pointerEvents: "none",
});
