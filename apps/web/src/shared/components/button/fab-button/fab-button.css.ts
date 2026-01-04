import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const fabButton = style({
  width: "6.4rem",
  height: "6.4rem",
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.main[500],
  boxShadow: vars.shadow.e400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.grayscale[0],
  cursor: "pointer",
});

export const icon = style({
  flexShrink: 0,
  display: "block",
});
