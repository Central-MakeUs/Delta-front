import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const page = style({
  padding: "2.0rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const viewport = style({
  width: "100%",
  maxWidth: "36.0rem",
  overflow: "hidden",
  borderRadius: vars.radius.r12,
  border: `0.1rem solid ${vars.color.grayscale[200]}`,
  touchAction: "pan-y",
  WebkitTapHighlightColor: "transparent",
});

export const track = style({
  display: "flex",
  width: "100%",
  transition: "transform 0.35s ease",
  willChange: "transform",
});

export const trackDragging = style({
  transition: "none",
});

export const slide = style([
  {
    width: "100%",
    flexShrink: 0,
    minHeight: "16.0rem",
    padding: "2.0rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: 600,
    userSelect: "none",
  },
  bgColor["grayscale-50"],
  color["grayscale-900"],
]);
