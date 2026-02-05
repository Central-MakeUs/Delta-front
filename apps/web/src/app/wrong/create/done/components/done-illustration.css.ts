import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

const LEFT_GAP = "3.2rem";

export const frame = style({
  width: "100%",
  height: "56rem",
  borderBottomLeftRadius: vars.radius.r32,
  overflow: "hidden",
  position: "relative",
  marginLeft: "auto",
  marginTop: 0,
});

export const iconWrap = style({
  display: "flex",
  position: "absolute",
  alignItems: "flex-end",
  zIndex: vars.zIndex.contentOverlay,
  top: "2.8rem",
  left: LEFT_GAP,
  gap: "2rem",
});

export const checkBadge = style({
  width: "4rem",
  height: "4rem",
  borderRadius: vars.radius.full,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const imageWrap = style({
  position: "absolute",
  left: LEFT_GAP,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
});

export const image = style({
  width: "100%",
  minWidth: "35rem",
  height: "auto",
  maxWidth: "none",
  display: "block",
});
