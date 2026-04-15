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
  padding: "0 1.6rem 1.6rem",
  overflowX: "auto",
  position: "relative",
  zIndex: 1,
});

export const tabDivider = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "1.6rem",
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

export const card = style([
  bgColor["grayscale-50"],
  {
    position: "relative",
    aspectRatio: "174 / 174",
    cursor: "pointer",
    borderRadius: `0 0 ${vars.radius.r12} ${vars.radius.r12}`,
  },
]);

export const cardFrame = style({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: `0 0 ${vars.radius.r12} ${vars.radius.r12}`,
  overflow: "hidden",
});

export const cardImage = style({
  objectFit: "cover",
});

export const cardOverlay = style({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(17, 17, 17, 1) 100%)",
  opacity: 0.6,
});

export const subjectChip = style({
  position: "absolute",
  top: 0,
  right: "-3px",
  zIndex: vars.zIndex.contentOverlayHigh,
  borderRadius: `0 0 0 ${vars.radius.r8}`,
});

export const cardBody = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "1.2rem",
});

export const cardContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.8rem",
});

export const chipWrap = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.6rem",
  alignItems: "flex-start",
});

export const unitChip = style([
  color["grayscale-900"],
  bgColor["grayscale-50"],
]);

export const cardTitle = style([
  typo.body1.bold,
  color["grayscale-0"],
  {
    alignSelf: "stretch",
  },
]);

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
    paddingBottom: "calc(1.6rem + env(safe-area-inset-bottom))",
  },
]);
