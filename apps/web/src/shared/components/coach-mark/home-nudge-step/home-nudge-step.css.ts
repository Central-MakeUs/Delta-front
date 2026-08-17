import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import {
  FAB_DOCK_BOTTOM,
  FAB_SIZE,
} from "@/shared/components/button/fab-button/fab-button.css";
import { riseIn } from "@/shared/components/coach-mark/coach-mark-animation.css";

export const dock = style({
  position: "fixed",
  left: "50%",
  bottom: FAB_DOCK_BOTTOM,
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  minWidth: "37rem",
  height: FAB_SIZE,
  zIndex: vars.zIndex.coachMark,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingRight: `calc(${vars.space[4]} + ${FAB_SIZE} + 1.2rem)`,
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style([
  riseIn,
  {
    pointerEvents: "auto",
  },
]);
