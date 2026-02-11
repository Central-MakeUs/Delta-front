import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const imageContainer = style({
  boxSizing: "border-box",
  width: "100%",
  height: "auto",
  background: vars.color.grayscale[50],
  border: `0.1rem solid ${vars.color.grayscale[100]}`,
  borderRadius: vars.radius.r12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const image = style({
  width: "100%",
  height: "auto",
  display: "block",
  verticalAlign: "middle",
});
