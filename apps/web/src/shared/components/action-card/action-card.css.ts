import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const circleSizeVar = createVar();

export const card = style({
  width: "100%",
  border: "none",
  padding: "3.6rem 0",
  borderRadius: vars.radius.r20,
  cursor: "pointer",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.2rem",
});

export const iconCircle = style({
  width: circleSizeVar,
  height: circleSizeVar,
  borderRadius: vars.radius.full,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
});

export const title = style({
  textAlign: "center",
});
