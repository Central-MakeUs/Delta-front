import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

/** 바텀 내비게이션(높이 6.4rem) 바로 위, 그래프 탭 근처에 말풍선을 띄우는 독 */
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
