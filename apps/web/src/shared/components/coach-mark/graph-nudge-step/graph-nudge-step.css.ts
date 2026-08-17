import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { riseIn } from "@/shared/components/coach-mark/coach-mark-animation.css";

export const dock = style({
  position: "fixed",
  left: "50%",
  bottom: "6.5rem",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  zIndex: vars.zIndex.bottomSheet,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "3rem",
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style([
  riseIn,
  {
    pointerEvents: "auto",
  },
]);
