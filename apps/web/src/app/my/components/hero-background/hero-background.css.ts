import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const wrap = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  containerType: "inline-size",
  containerName: "hero-bg",
});

export const diagonal1 = style({
  position: "absolute",
  right: "-4.7rem",
  top: "-4.7rem",
  width: "33.8rem",
  height: "33.8rem",
  borderTopRightRadius: vars.radius.r12,
  borderBottomRightRadius: vars.radius.r12,
  overflow: "hidden",
  "@container": {
    "hero-bg (max-width: 405px)": {
      right: "-7rem",
    },
  },
});

export const pinwheel = style({
  position: "absolute",
  left: "-0.8rem",
  top: "6.4rem",
  width: "8rem",
  height: "8rem",
});

export const diagonal1Narrow = style({
  right: "-6rem",
});

export const diagonal2 = style({
  position: "absolute",
  left: "-3.0rem",
  top: "20.0rem",
  width: "25.0rem",
  height: "8.0rem",
});
