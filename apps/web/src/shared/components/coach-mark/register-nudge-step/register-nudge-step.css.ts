import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import {
  FAB_DOCK_BOTTOM,
  FAB_SIZE,
} from "@/shared/components/button/fab-button/fab-button.css";

/** 화면 전체(앱바 포함)를 하얗게 덮어 FAB만 도드라져 보이게 한다. */
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

/** 실제 FAB와 동일한 위치에 스포트라이트용 FAB·말풍선을 나란히 띄우는 독 */
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

/** FAB를 가리키는 손가락 커서 장식 */
export const hand = style({
  position: "absolute",
  right: "-0.8rem",
  bottom: "-2rem",
  transform: "rotate(-20deg)",
  pointerEvents: "none",
});
