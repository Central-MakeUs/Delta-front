import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  width: "100%",
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  width: "100%",
});

export const fieldLabel = style([typo.body2.semibold, color["grayscale-700"]]);
