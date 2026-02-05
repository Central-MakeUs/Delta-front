import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const root = style([
  bgColor["grayscale-0"],
  {
    padding: "1.6rem",
    borderRadius: vars.radius.r20,
    boxShadow: `inset 0 0 0 0.1rem ${vars.color.grayscale[100]}`,
    display: "flex",
    flexDirection: "column",
    gap: "1.0rem",
  },
]);

export const barsRow = style({
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  gap: "1.3rem",
});

export const barCol = style({
  flex: "1 1 0",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "0.4rem",
});

export const barWrap = style({
  width: "100%",
  position: "relative",
  display: "flex",
  minWidth: 0,
});

export const barGraph = style({
  width: "100%",
});

export const rank = style([
  color["grayscale-700"],
  typo.caption.bold,
  {
    fontSize: "1.2rem",
    fontWeight: 700,
    lineHeight: "1.8rem",
    whiteSpace: "nowrap",
  },
]);

export const list = style([
  bgColor["grayscale-50"],
  {
    width: "100%",
    padding: "1.2rem",
    borderRadius: vars.radius.r12,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2.0rem",
    rowGap: "1.7rem",
  },
]);

export const listItem = style({
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const listRank = style([
  color["grayscale-700"],
  typo.body2.bold,
  {
    whiteSpace: "nowrap",
  },
]);

export const listText = style([
  color["grayscale-700"],
  typo.body3.semibold,
  {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
]);

export const emptyRoot = style({
  height: "27rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const emptyContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  alignItems: "center",
  justifyContent: "center",
});

export const emptyText = style([
  typo.body2.medium,
  color["grayscale-700"],
  {
    textAlign: "center",
  },
]);
