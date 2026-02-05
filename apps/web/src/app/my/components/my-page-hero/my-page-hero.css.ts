import { style } from "@vanilla-extract/css";
import { bgColor, color, myGradient } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";

const APP_BAR_HEIGHT = "5.4rem";

export const hero = style({
  position: "relative",
  height: "25.8rem",
  overflow: "hidden",
  background: myGradient["my-bg"],
  paddingTop: `calc(${APP_BAR_HEIGHT} + env(safe-area-inset-top))`,
  paddingBottom: "2.0rem",
  display: "flex",
  zIndex: vars.zIndex.base,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
});

export const profileBlock = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlayHigh,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.8rem",
});

export const nameRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
});

export const editButton = style([
  bgColor["grayscale-0"],
  color["grayscale-500"],
  {
    width: "2.8rem",
    height: "2.8rem",
    borderRadius: vars.radius.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
]);
