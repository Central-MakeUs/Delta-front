import { style } from "@vanilla-extract/css";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const container = style({
  width: "100%",
  flexDirection: "column",
  display: "flex",
  gap: "2rem",
});

export const chipGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1.2rem",
  padding: "0 1.6rem",
});

export const chipItem = style({
  width: "100%",
});

export const icon = style([color["grayscale-700"]]);

export const checkSection = style({
  flexDirection: "column",
  gap: "1.2rem",
  display: "flex",
});

export const checkTitleSection = style({
  alignItems: "center",
  gap: "0.8rem",
  display: "flex",
  padding: "0 1.6rem",
});

export const checkTitle = style([typo.body2.medium, color["grayscale-700"]]);

export const checkList = style({
  alignItems: "center",
  gap: "1.6rem",
  padding: "0 1.6rem",
  display: "flex",
});

export const buttonGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: "1.2rem",
  rowGap: "1.6rem",
  padding: "0 1.6rem",
});
