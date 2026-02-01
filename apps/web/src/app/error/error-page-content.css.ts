import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  height: "90vh",
  alignItems: "center",
  justifyContent: "center",
  padding: "2.4rem 1.6rem",
  boxSizing: "border-box",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.4rem",
  maxWidth: "32rem",
  width: "100%",
});

export const iconWrapper = style({
  width: "5.6rem",
  height: "5.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style([
  typo.body2.medium,
  color["grayscale-700"],
  {
    textAlign: "center",
  },
]);

export const description = style([
  typo.body1.regular,
  color["grayscale-600"],
  {
    textAlign: "center",
    lineHeight: 1.5,
  },
]);

export const actions = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  width: "100%",
  marginTop: "0.8rem",
});
