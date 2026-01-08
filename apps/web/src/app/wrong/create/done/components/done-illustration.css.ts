import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const frame = style({
  width: "100%",
  height: "56rem",
  borderBottomLeftRadius: vars.radius.r32,
  overflow: "hidden",
  position: "relative",
  marginLeft: "auto",
  marginTop: 0,
});
export const image = style({
  objectFit: "cover",
});
