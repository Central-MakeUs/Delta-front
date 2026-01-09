import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const wrap = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

export const pinwheel = style({
  position: "absolute",
  left: "0.8rem",
  top: "6.4rem",
  width: "6.0rem",
  height: "6.0rem",
  opacity: 0.25,
});

export const diagonal1 = style({
  position: "absolute",
  right: "-2.0rem",
  top: "1.0rem",
  width: "22.0rem",
  height: "22.0rem",
  opacity: 0.5,
  borderTopRightRadius: vars.radius.r12,
  borderBottomRightRadius: vars.radius.r12,
});

export const diagonal2 = style({
  position: "absolute",
  right: "4.0rem",
  top: "10.0rem",
  width: "20.0rem",
  height: "8.0rem",
  opacity: 0.5,
});
