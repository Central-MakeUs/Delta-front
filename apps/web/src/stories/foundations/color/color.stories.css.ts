import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  padding: "4.8rem",
  display: "flex",
  flexDirection: "column",
  gap: "4.8rem",
  background: vars.color.bg,
});

export const group = style({
  marginBottom: "4.8rem",
});

export const groupTitle = style({
  marginBottom: "1.6rem",
  fontSize: vars.typography.h3.fontSize,
  fontWeight: vars.typography.h3.fontWeight,
  letterSpacing: vars.typography.h3.letterSpacing,
  lineHeight: vars.typography.h3.lineHeight,
  color: vars.color.fg,
});

export const grid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "2.4rem",
});

export const box = style({
  width: "14.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const swatch = style({
  width: "14.4rem",
  height: "14.4rem",
  borderRadius: vars.radius.r8,
  boxShadow: vars.shadow.e100,
  border: `1px solid ${vars.color.border}`,
});

export const tokenName = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.semibold,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[1000],
});

export const sampleText = style({
  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.medium,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
});
export const tabs = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.8rem",
  alignItems: "center",
});

export const tab = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.bg,
  borderRadius: vars.radius.full,
  padding: "0.8rem 1.2rem",
  cursor: "pointer",

  fontSize: vars.typography.caption.fontSize,
  fontWeight: vars.typography.caption.fontWeight.semibold,
  letterSpacing: vars.typography.caption.letterSpacing,
  lineHeight: vars.typography.caption.lineHeight,
  color: vars.color.grayscale[700],

  selectors: {
    "&:hover": {
      background: vars.color.grayscale[50],
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: "2px",
    },
  },
});

export const tabActive = style({
  borderColor: vars.color.brand,
  color: vars.color.brand,
  background: vars.color.muted,
});
