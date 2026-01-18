import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const page = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.6rem",
});

export const title = style([
  typo.h3,
  {
    display: "flex",
    color: vars.color.grayscale[900],
    marginTop: "7.4rem",
  },
]);
