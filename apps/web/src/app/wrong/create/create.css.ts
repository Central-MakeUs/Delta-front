import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style([
  {
    display: "flex",
    flexDirection: "column",
    gap: "2.8rem",
    padding: "2rem 1.6rem",
  },
]);

export const titleSection = style([
  {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
]);

export const title = style([typo.h3, color["grayscale-900"]]);

export const subTtitle = style([typo.body2.medium, color["grayscale-600"]]);

export const cardSection = style([
  {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
  },
]);
