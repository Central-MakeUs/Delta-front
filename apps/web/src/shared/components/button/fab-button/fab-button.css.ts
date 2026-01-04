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
  touchAction: "manipulation",

  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: vars.color.main[600],
    },
    "&:active:not(:disabled)": {
      backgroundColor: vars.color.main[700],
    },

    "&:focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 0.3rem ${vars.color.main[100]}, ${vars.shadow.e400}`,
    },

    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: vars.color.grayscale[100],
      color: vars.color.grayscale[500],
      boxShadow: "none",
    },
  },
});

export const icon = style({
  flexShrink: 0,
  display: "block",
});
