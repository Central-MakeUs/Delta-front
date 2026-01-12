import { style } from "@vanilla-extract/css";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  padding: "1.2rem 1.6rem",
  gap: "2rem",
});

export const filterSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const filterRow = style([
  {
    display: "flex",
    gap: "0.8rem",
  },
]);

export const sortRow = style([
  {
    display: "flex",
    justifyContent: "space-between",
  },
]);

export const wrongLabel = style([
  typo.body2.semibold,
  color["grayscale-700"],
  {
    display: "flex",
  },
]);

export const wrongCount = style([color["main-500"]]);

export const cardSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});
