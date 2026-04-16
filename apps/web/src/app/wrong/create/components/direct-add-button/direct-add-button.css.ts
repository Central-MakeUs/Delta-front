import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
  minWidth: 0,
  cursor: "pointer",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

export const label = style({
  display: "block",
  textAlign: "center",
  whiteSpace: "nowrap",
});

export const inputWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
  minWidth: 0,
  cursor: "text",
});

export const input = style({
  width: "9ch",
  border: "none",
  outline: "none",
  background: "transparent",
  textAlign: "center",
  minWidth: 0,

  selectors: {
    "&::placeholder": {
      color: vars.color.grayscale[400],
      opacity: 1,
    },
  },
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
