import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  paddingTop: "env(safe-area-inset-top)",
  pointerEvents: "none",
  zIndex: vars.zIndex.toast,
  opacity: "0.8",
});

export const lottie = style({
  width: "100%",
});
