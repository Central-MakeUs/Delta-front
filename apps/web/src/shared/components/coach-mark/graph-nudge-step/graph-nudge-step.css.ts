import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const dock = style({
  position: "fixed",
  left: "50%",
  // "위로 올라가기" 버튼(bottom 9rem + 높이)보다 위에 떠야 한다.
  bottom: "calc(13.6rem + env(safe-area-inset-bottom))",
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
