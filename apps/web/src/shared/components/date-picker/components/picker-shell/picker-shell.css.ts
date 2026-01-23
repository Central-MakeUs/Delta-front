import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const pickerShell = style({
  position: "relative",
  width: "34rem",
  height: "36rem",
  backgroundColor: vars.color.grayscale[0],
  borderRadius: "1.2rem",
  boxShadow: "0px 0px 14px rgba(88, 88, 88, 0.12)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  overflow: "hidden",
});

