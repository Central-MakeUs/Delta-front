import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "3rem",
  background: vars.color.bg,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  borderRadius: vars.radius.r12,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.e100,
  background: vars.color.bg,
});

export const title = style({
  marginBottom: "0.8rem",
  fontSize: vars.typography.h3.fontSize,
  fontWeight: vars.typography.h3.fontWeight,
  letterSpacing: vars.typography.h3.letterSpacing,
  lineHeight: vars.typography.h3.lineHeight,
  color: vars.color.grayscale[1000],
});

export const image = style({
  width: "15rem",
});
