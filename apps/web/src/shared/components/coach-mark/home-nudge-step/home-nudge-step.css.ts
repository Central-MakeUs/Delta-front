import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import {
  FAB_DOCK_BOTTOM,
  FAB_SIZE,
} from "@/shared/components/button/fab-button/fab-button.css";

/** 그래프 화면의 실제 FAB 왼쪽에 말풍선을 세로 중앙 정렬로 띄우는 독 */
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
  // FAB 자리(우측 여백 1.6rem + FAB 너비)와 간격 1.2rem을 비워둔다.
  paddingRight: `calc(${vars.space[4]} + ${FAB_SIZE} + 1.2rem)`,
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style({
  pointerEvents: "auto",
});
