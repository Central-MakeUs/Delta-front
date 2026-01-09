import { style } from "@vanilla-extract/css";

const APP_BAR_HEIGHT = "5.4rem";

export const hero = style({
  position: "relative",
  height: "25.8rem",
  overflow: "hidden",
  background: `linear-gradient(143deg, #fdd8d2ff 0%, #FFB4A9 91%, #FFB4A9 100%), #ffffff`,
  paddingTop: `calc(${APP_BAR_HEIGHT} + env(safe-area-inset-top))`,
  paddingBottom: "2.0rem",
  display: "flex",
  zIndex: 0,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
});

export const profileBlock = style({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.8rem",
});
