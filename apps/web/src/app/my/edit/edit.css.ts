import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const contentWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "7.4rem 1.6rem 1.6rem",
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  width: "100%",
});

export const fieldLabel = style([typo.body2.semibold, color["grayscale-700"]]);

export const buttonWrapper = style({
  display: "flex",
  position: "sticky",
  bottom: 0,
  flexDirection: "column",
  padding: "1.6rem",
  width: "100%",
});
