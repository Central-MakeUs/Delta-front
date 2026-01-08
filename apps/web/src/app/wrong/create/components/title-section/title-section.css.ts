import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const titleSection = style([
  {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
]);

export const title = style([typo.h3, color["grayscale-900"]]);

export const subTitle = style([typo.body2.medium, color["grayscale-600"]]);
