import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "2rem",
  width: "100%",
  marginTop: "2rem",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "0.8rem",
  width: "100%",
});

export const titleRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    width: "fit-content",
    height: "2.7rem",
  },
]);

export const metaChips = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "0.8rem",
  width: "fit-content",
});

export const image = style([
  bgColor["grayscale-0"],
  {
    boxSizing: "border-box",
    width: "100%",
    height: "23.8rem",
    border: `0.1rem solid ${vars.color.grayscale[100]}`,
    borderRadius: vars.radius.r12,
    objectFit: "cover",
  },
]);
