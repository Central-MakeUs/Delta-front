import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const button = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
  padding: "1.6rem",
  border: `0.1rem solid ${vars.color.grayscale[100]}`,
  borderRadius: vars.radius.r12,
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
});

export const inputWrapper = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.6rem",
  border: `0.1rem solid ${vars.color.grayscale[100]}`,
  borderRadius: vars.radius.r12,
});

export const input = style({
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  textAlign: "center",
  minWidth: 0,

  selectors: {
    "&::placeholder": {
      color: vars.color.grayscale[100],
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
