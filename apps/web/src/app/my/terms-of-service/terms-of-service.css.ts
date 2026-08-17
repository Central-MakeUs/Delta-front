import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "1.6rem 2.0rem",
  gap: "2rem",
});

export const contentWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const title = style([typo.body2.semibold, color["grayscale-700"]]);

export const content = style([
  typo.body2.regular,
  color["grayscale-900"],
  bgColor["grayscale-50"],
  {
    width: "100%",
    borderRadius: vars.radius.r12,
    display: "flex",
    flexDirection: "column",
    padding: "1.6rem",
    gap: "0.8rem",
  },
]);

export const paragraph = style({
  margin: 0,
});

export const bulletItem = style({
  margin: 0,
  position: "relative",
  paddingLeft: "1.2rem",
  selectors: {
    "&::before": {
      content: '"-"',
      position: "absolute",
      left: 0,
      top: 0,
    },
  },
});
