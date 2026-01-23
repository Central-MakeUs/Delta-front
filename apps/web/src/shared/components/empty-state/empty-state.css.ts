import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[4],
  textAlign: "center",
});

export const text = style([
  typo.body2.medium,
  color["grayscale-600"],
  {
    whiteSpace: "pre-line",
  },
]);
