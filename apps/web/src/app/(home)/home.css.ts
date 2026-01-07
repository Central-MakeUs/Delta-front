import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style([
  {
    display: "grid",
    gap: "2.8rem",
    padding: "2rem 1.6rem",
    minHeight: "100%",
  },
]);

export const title = style([
  typo.subtitle.semibold,
  color["grayscale-1000"],
  {
    margin: 0,
    whiteSpace: "pre-line",
  },
]);

export const incorrect = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const graph = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.0rem",
});
