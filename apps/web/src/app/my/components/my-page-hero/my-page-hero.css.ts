import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

const APP_BAR_HEIGHT = "5.4rem";

export const hero = style({
  position: "relative",
  height: "25.8rem",
  overflow: "hidden",
  background: `linear-gradient(143deg, ${vars.color.main[100]} 0%, ${vars.color.main[200]} 100%)`,
  paddingTop: `calc(${APP_BAR_HEIGHT} + env(safe-area-inset-top))`,
  paddingBottom: "2.0rem",
  display: "flex",
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
