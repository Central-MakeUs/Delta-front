import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { FAB_DOCK_BOTTOM } from "@/shared/components/button/fab-button/fab-button.css";

export const dock = style({
  position: "fixed",
  left: "50%",
  bottom: FAB_DOCK_BOTTOM,
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "43rem",
  // "위로 올라가기" 버튼(zIndex.bottomSheet)에 가려지지 않아야 한다.
  zIndex: vars.zIndex.bottomSheet,
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "1.2rem",
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const tooltip = style({
  pointerEvents: "auto",
});
