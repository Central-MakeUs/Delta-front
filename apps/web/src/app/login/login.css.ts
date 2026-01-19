import { style } from "@vanilla-extract/css";
import { bgGradient, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  minHeight: "100dvh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "34.3rem",
      background: bgGradient["login-bg"],
      zIndex: vars.zIndex.base,
      pointerEvents: "none",
    },
  },
});

export const content = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlayHigh,
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const header = style({
  paddingTop: "4.8rem",
  paddingLeft: "1.6rem",
  paddingRight: "1.6rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const tagline = style([
  typo.h3,
  color["grayscale-700"],
  {
    fontWeight: 500,
  },
]);

export const actions = style({
  marginTop: "auto",
  paddingLeft: "1.6rem",
  paddingRight: "1.6rem",
  paddingBottom: "calc(env(safe-area-inset-bottom) + 1.6rem)",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const decorations = style({
  position: "absolute",
  inset: 0,
  zIndex: vars.zIndex.contentOverlay,
  pointerEvents: "none",
  userSelect: "none",
});

export const deco = style({
  position: "absolute",
});

export const vector14 = style([
  deco,
  { left: "-4.3rem", top: "27.8rem", width: "45.5rem", height: "51.3rem" },
]);

export const pencil = style([
  deco,
  { left: "17rem", top: "5.5rem", width: "27.0rem", height: "27.0rem" },
]);

export const multiply = style([
  deco,
  {
    left: "4rem",
    top: "20.1rem",
    width: "6.4rem",
    height: "6.4rem",
    transform: "rotate(2deg)",
  },
]);

export const minus = style([
  deco,
  {
    right: "1.8rem",
    top: "42rem",
    width: "13.5rem",
    height: "4.7rem",
    transform: "rotate(4deg)",
  },
]);

export const plus = style([
  deco,
  {
    left: "1.5rem",
    top: "49.5rem",
    width: "7.8rem",
    height: "7.8rem",
    transform: "rotate(-8deg)",
  },
]);

export const divide = style([
  deco,
  {
    right: "3.5rem",
    top: "54rem",
    width: "14.9rem",
    height: "13.2rem",
    transform: "rotate(-2deg)",
  },
]);
