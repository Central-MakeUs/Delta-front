import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const root = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1.6rem",
  padding: "2.4rem 2.8rem",
});

export const pillRow = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const pill = style([
  bgColor["grayscale-50"],
  {
    padding: "0.4rem 0",
    borderRadius: vars.radius.r64,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
  },
]);

export const pillText = style([
  typo.caption.semibold,
  color["grayscale-700"],
  { whiteSpace: "nowrap" },
]);

export const artwork = style({
  width: "10rem",
  height: "11.2rem",
  position: "relative",
  alignSelf: "center",
});
