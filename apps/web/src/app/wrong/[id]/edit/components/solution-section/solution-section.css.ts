import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
});

export const title = style([
  typo.body2.semibold,
  color["grayscale-700"],
  {
    width: "100%",
    height: "2.4rem",
  },
]);

export const textField = style({
  width: "100%",
});

