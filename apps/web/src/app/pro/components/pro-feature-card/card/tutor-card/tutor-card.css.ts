import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const root = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1.6rem",
  padding: "4.4rem 2.8rem",
});

export const artwork = style({
  width: "100%",
  position: "relative",
});

export const galleryWrap = style({
  width: "7.7rem",
  height: "7.7rem",
  position: "absolute",
  left: "0",
  top: "0",
});

export const pencilWrap = style({
  width: "8.2rem",
  height: "8.2rem",
  position: "absolute",
  right: "0",
  top: "5rem",
  zIndex: "1",
  pointerEvents: "none",
});
