import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { color, bgColor } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const page = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.grayscale[0],
});

export const header = style({
  padding: "2rem 1.6rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const title = style([typo.h3, color["grayscale-900"]]);
export const description = style([typo.body2.medium, color["grayscale-600"]]);

export const tabRow = style({
  display: "flex",
  gap: "0.8rem",
  padding: "0 1.6rem 1.6rem",
  borderBottom: `1px solid ${vars.color.grayscale[100]}`,
  overflowX: "auto",
});

export const tabButton = style([
  typo.body2.semibold,
  {
    padding: "0.8rem 0.4rem",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: vars.color.grayscale[500],
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
]);

export const tabButtonActive = style({
  color: vars.color.grayscale[900],
  borderBottomColor: vars.color.grayscale[900],
});

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

export const card = style({
  position: "relative",
  borderRadius: vars.radius.r12,
  overflow: "hidden",
  aspectRatio: "174 / 174",
  border: `1px solid ${vars.color.grayscale[100]}`,
  backgroundColor: vars.color.grayscale[50],
  cursor: "pointer",
});

export const cardImage = style({
  objectFit: "cover",
});

export const cardOverlay = style({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(17,17,17,0.60) 100%)",
});

export const subjectBadge = style({
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.4rem 1.2rem",
  backgroundColor: vars.color.main[500],
  borderBottomLeftRadius: vars.radius.r8,
});

export const subjectBadgeText = style([
  typo.caption.semibold,
  {
    color: vars.color.grayscale[0],
  },
]);

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

export const chipUnit = style([
  typo.caption.semibold,
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.4rem 0.8rem",
    borderRadius: vars.radius.r6,
    backgroundColor: "rgba(241, 241, 244, 0.92)",
    color: vars.color.grayscale[800],
  },
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
    left: 0,
    right: 0,
    bottom: 0,
    padding: "1.6rem",
    paddingBottom: "calc(1.6rem + env(safe-area-inset-bottom))",
  },
]);
