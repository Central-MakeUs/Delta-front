import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "4.8rem 2.4rem",
  background: `linear-gradient(180deg, ${vars.color.bg} 0%, ${vars.color.muted} 100%)`,
});

export const card = style({
  width: "min(56rem, 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "2.0rem",
  padding: "2.4rem",
  borderRadius: vars.radius.r24,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.e300,
  background: vars.color.bg,

  transition: "transform 160ms ease, box-shadow 160ms ease",

  selectors: {
    "&:hover": {
      transform: "translateY(-0.2rem)",
      boxShadow: vars.shadow.e400,
    },
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const title = style({
  fontSize: vars.typography.h3.fontSize,
  fontWeight: vars.typography.h3.fontWeight,
  letterSpacing: vars.typography.h3.letterSpacing,
  lineHeight: vars.typography.h3.lineHeight,
  color: vars.color.grayscale[1000],
});

export const subtitle = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.medium,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[600],
});

export const preview = style({
  display: "grid",
  placeItems: "center",
  padding: "2.4rem",
  borderRadius: vars.radius.r20,
  border: `1px dashed ${vars.color.border}`,
  background: vars.color.main[50],
});

export const image = style({
  width: "15rem",
  height: "15rem",
  objectFit: "contain",
  filter: "drop-shadow(0 0.6rem 1.8rem rgba(0,0,0,0.10))",
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.2rem",
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.6rem 1.0rem",
  borderRadius: vars.radius.full,
  background: vars.color.grayscale[50],
  border: `1px solid ${vars.color.border}`,
  color: vars.color.grayscale[700],

  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.semibold,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
});

export const hint = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.regular,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[600],
});
