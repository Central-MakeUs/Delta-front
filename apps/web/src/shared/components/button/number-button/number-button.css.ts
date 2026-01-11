import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const buttonBase = style({
  border: 0,
  cursor: "pointer",
  padding: "1rem",
  borderRadius: vars.radius.r8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  flex: "0 0 auto",
  maxWidth: "100%",
  width: "100%",
  height: "4rem",
  transition:
    "background-color 120ms ease, color 120ms ease, opacity 120ms ease",
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.main[500]}`,
      outlineOffset: "2px",
    },
  },
});

export const inactive = style([
  typo.body3.medium,
  bgColor["grayscale-50"],
  color["grayscale-700"],
]);

export const active = style([
  typo.body3.semibold,
  bgColor["main-500"],
  color["grayscale-0"],
]);

export const label = style({
  whiteSpace: "nowrap",
  wordBreak: "keep-all",
  display: "inline-block",
  width: "4.5rem",
});
