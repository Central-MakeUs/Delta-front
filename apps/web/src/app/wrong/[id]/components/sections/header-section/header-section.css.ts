import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const headerSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "0.8rem",
  width: "100%",
  flex: "none",
});

export const headerTop = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
  flex: "none",
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
