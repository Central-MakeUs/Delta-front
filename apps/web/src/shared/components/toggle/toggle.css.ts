import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const root = style([
  bgColor["main-50"],
  {
    display: "flex",
    flex: "0 0 auto",
    placeSelf: "start",
    justifySelf: "start",
    padding: "0.2rem",
    borderRadius: "17px",
  },
]);

export const row = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.6rem",
});

export const rowRightActive = style({
  paddingLeft: "1rem",
});

export const rowLeftActive = style({
  paddingRight: "1rem",
});

export const label = style({
  whiteSpace: "nowrap",
  wordBreak: "keep-all",
});

export const ghostButton = style([
  typo.caption.medium,
  color["main-200"],
  {
    border: 0,
    background: "transparent",
    cursor: "pointer",
    padding: "0.5rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",

    selectors: {
      "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
      "&:focus-visible": {
        outline: `2px solid ${vars.color.main[400]}`,
        outlineOffset: "2px",
        borderRadius: "25px",
      },
    },
  },
]);

export const pillButton = style([
  typo.caption.semibold,
  color["grayscale-0"],
  bgColor["main-400"],
  {
    border: 0,
    cursor: "pointer",
    width: "6rem",
    padding: "0.5rem 1.4rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    flex: "0 0 auto",

    selectors: {
      "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
      "&:focus-visible": {
        outline: `2px solid ${vars.color.main[400]}`,
        outlineOffset: "2px",
        borderRadius: "25px",
      },
    },
  },
]);
