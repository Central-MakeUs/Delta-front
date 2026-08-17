import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { color, bgColor } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const page = style([
  bgColor["grayscale-0"],
  {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
]);

export const header = style({
  padding: "2rem 1.6rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const title = style([typo.h3, color["grayscale-900"]]);
export const description = style([typo.body2.medium, color["grayscale-500"]]);

export const tabSection = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const tabRow = style({
  display: "flex",
  gap: "0.8rem",
  padding: "0 1.6rem 0",
  overflowX: "auto",
  position: "relative",
  zIndex: 1,
});

export const tabDivider = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: vars.zIndex.background,
});

export const tabButton = style([
  typo.body2.semibold,
  color["grayscale-500"],
  {
    padding: "0.8rem 0.4rem",
    borderBottom: "0.2rem solid transparent",
    background: "transparent",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
]);

export const tabButtonActive = style([
  typo.body2.bold,
  color["grayscale-900"],
  {
    borderBottomColor: vars.color.grayscale[900],
  },
]);

export const content = style({
  flex: 1,
  padding: "2rem 1.6rem 12rem",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "1.2rem",
  "@media": {
    "screen and (max-width: 359px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const empty = style([
  typo.body2.medium,
  color["grayscale-500"],
  {
    padding: "3.2rem 0",
    textAlign: "center",
  },
]);

export const footer = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    margin: "0 auto",
    maxWidth: "43rem",
    zIndex: vars.zIndex.bottomNav,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "1.6rem",
  },
]);
