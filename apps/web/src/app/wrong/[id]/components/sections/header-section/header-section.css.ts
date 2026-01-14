import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const headerSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const headerTop = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    display: "flex",
    order: 0,
    flexGrow: 0,
  },
]);

export const headerChips = style({
  display: "flex",
  gap: "1.2rem",
});
