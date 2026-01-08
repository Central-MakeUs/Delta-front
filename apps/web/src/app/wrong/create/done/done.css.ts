import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  position: "relative",
  paddingLeft: "2.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const hero = style({
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",
});

export const checkBadge = style([
  {
    width: "4rem",
    height: "4rem",
    borderRadius: vars.radius.full,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);

export const textBlock = style({
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  gap: "0.8rem",
});

export const actions = style({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  paddingRight: "2.4rem",
  paddingBottom: "1.6rem",
  gap: "1.6rem",
});

export const primaryButton = style({
  width: "100%",
  height: "4.8rem",
  border: "none",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "1.6rem",
});

export const secondaryButton = style({
  width: "100%",
  height: "4.8rem",
  border: "none",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "1.6rem",
});
