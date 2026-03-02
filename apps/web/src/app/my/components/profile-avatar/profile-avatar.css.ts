import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor } from "@/shared/styles/color.css";

export const avatar = style([
  bgColor["grayscale-0"],
  {
    position: "relative",
    width: "9.2rem",
    height: "9.2rem",
    borderRadius: vars.radius.full,
    overflow: "hidden",
  },
]);

export const imageWrap = style({
  position: "absolute",
  inset: 0,
});

export const imageWrapHidden = style([
  imageWrap,
  {
    opacity: 0,
    pointerEvents: "none",
  },
]);

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const fallback = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
