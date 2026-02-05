import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style({
  width: "100%",
  maxWidth: "43rem",
  margin: "0 auto",
  background: "white",
  position: "relative",
});

export const main = style({
  padding: "3.2rem 1.6rem 10rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const title = style([
  typo.subtitle.bold,
  color["grayscale-900"],
  {
    textAlign: "center",
  },
]);

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.0rem",
});
