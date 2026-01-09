import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const avatar = style({
  width: "9.2rem",
  height: "9.2rem",
  borderRadius: vars.radius.full,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const fallback = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
