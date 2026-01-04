import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  minHeight: "100vh",
  padding: "4.8rem 2.4rem",
  background: vars.color.bg,
  color: vars.color.fg,
});

export const header = style({
  maxWidth: "96rem",
  margin: "0 auto",
  marginBottom: "2.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
});

export const title = style({
  fontSize: vars.typography.h2.fontSize,
  fontWeight: vars.typography.h2.fontWeight,
  letterSpacing: vars.typography.h2.letterSpacing,
  lineHeight: vars.typography.h2.lineHeight,
  color: vars.color.grayscale[1000],
});

export const desc = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.regular,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[600],
});

export const list = style({
  maxWidth: "96rem",
  margin: "0 auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.r12,
  overflow: "hidden",
  background: vars.color.bg,
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "20rem 1fr",
  gap: "2.0rem",
  padding: "1.6rem 2.0rem",
  alignItems: "center",

  selectors: {
    "&:not(:last-child)": {
      borderBottom: `1px solid ${vars.color.border}`,
    },
  },
});

export const key = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.semibold,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[700],
});

export const sample = style({
  color: vars.color.grayscale[1000],
});
