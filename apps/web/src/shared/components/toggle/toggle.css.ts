import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const indicatorXVar = createVar();
export const indicatorWVar = createVar();
export const indicatorOpacityVar = createVar();

export const root = style([
  bgColor["main-50"],
  {
    display: "flex",
    flex: "0 0 auto",
    placeSelf: "start",
    justifySelf: "start",
    padding: "0 0.2rem",
    borderRadius: "17px",
  },
]);

export const row = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const indicator = style([
  bgColor["main-400"],
  {
    position: "absolute",
    top: "0.2rem",
    bottom: "0.2rem",
    left: 0,

    width: indicatorWVar,
    borderRadius: "25px",

    transform: `translateX(${indicatorXVar})`,
    opacity: indicatorOpacityVar,
    transition: "transform 160ms ease, width 160ms ease, opacity 120ms ease",

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
]);

export const rowRightActive = style({ paddingLeft: "1rem" });
export const rowLeftActive = style({ paddingRight: "1rem" });

export const label = style({
  whiteSpace: "nowrap",
  wordBreak: "keep-all",
});

export const ghostButton = style([
  typo.caption.medium,
  color["main-200"],
  {
    position: "relative",
    zIndex: 1,
    border: 0,
    background: "transparent",
    cursor: "pointer",
    padding: "0.5rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    fontFamily: "inherit",
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
  {
    position: "relative",
    zIndex: 1,
    border: 0,
    cursor: "pointer",
    width: "6rem",
    height: "2.8rem",
    padding: "0.5rem 1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    flex: "0 0 auto",
    fontFamily: "inherit",
    background: "transparent",
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
