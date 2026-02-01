import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const root = style({
  height: "22.5rem",
  position: "relative",
  overflow: "hidden",
  background: `radial-gradient(ellipse 83% 83% at 46% 0%, ${vars.color.main[100]} 0%, white 95%)`,
});

export const backWrapper = style([
  color["grayscale-900"],
  {
    display: "flex",
    position: "fixed",
    maxWidth: "43rem",
    width: "100%",
    zIndex: vars.zIndex.header,
  },
]);

export const backButton = style([
  color["grayscale-900"],
  {
    position: "absolute",
    top: "1.6rem",
    left: "1.6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
]);

export const center = style({
  position: "absolute",
  left: "50%",
  top: "9.3rem",
  transform: "translateX(-50%)",
  width: "100%",
  display: "flex",
  zIndex: vars.zIndex.contentOverlayHigh,
  flexDirection: "column",
  alignItems: "center",
});

export const kicker = style([typo.h1, color["main-800"]]);

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
});

export const title = style([typo.h1, color["main-800"]]);

export const multiply = style({
  position: "absolute",
  left: "1.6rem",
  top: "2.0rem",
  width: "5.6rem",
  height: "5.6rem",
  opacity: 0.45,
  zIndex: vars.zIndex.contentOverlay,
  pointerEvents: "none",
});

export const divide = style({
  position: "absolute",
  right: "1.6rem",
  top: "5.2rem",
  width: "5.6rem",
  height: "5.6rem",
  opacity: 0.45,
  zIndex: vars.zIndex.contentOverlay,
  pointerEvents: "none",
});

export const blocks = style({
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
  padding: "0",
  display: "flex",
  alignItems: "flex-end",
  gap: "0.9rem",
});

const blockBase = style([
  {
    flex: 1,
    borderTopLeftRadius: vars.radius.r6,
    borderTopRightRadius: vars.radius.r6,
    background: `linear-gradient(360deg, rgba(255, 96, 74, 0.2) 0%, rgba(255, 255, 255, 0.6) 100%)`,
  },
]);

export const blockSm = style([blockBase, { height: "3.8rem" }]);
export const blockMd = style([blockBase, { height: "5.4rem" }]);
export const blockLg = style([blockBase, { height: "8.0rem" }]);
export const blockXl = style([blockBase, { height: "11.3rem" }]);
