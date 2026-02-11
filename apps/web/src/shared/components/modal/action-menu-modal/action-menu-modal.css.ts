import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";
import { APP_BAR_HEIGHT } from "@/shared/components/app-bar/constants/app-bar";

export const overlay = style({
  position: "fixed",
  inset: 0,
  height: "100vh",
  background: "transparent",
  zIndex: vars.zIndex.modalOverlay,
});

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
  maxWidth: "43rem",
  margin: "0 auto",
});

export const menu = style([
  bgColor["grayscale-0"],
  {
    position: "absolute",
    top: `calc(${APP_BAR_HEIGHT} + 0.1rem)`,
    right: vars.space[4],
    width: "fit-content",
    borderRadius: vars.radius.r16,
    overflow: "hidden",
    boxShadow: vars.shadow.e400,
    display: "flex",
    flexDirection: "column",
  },
]);

export const list = style({
  display: "flex",
  flexDirection: "column",
});

export const itemButton = style([
  bgColor["grayscale-0"],
  {
    appearance: "none",
    border: "none",
    width: "100%",
    padding: "1.2rem 2rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
]);

export const itemText = style([typo.body3.medium, color["grayscale-700"]]);
