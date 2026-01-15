import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "2rem",
  width: "100%",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
});

export const headerRow = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
});

export const title = style([
  typo.body2.semibold,
  color["grayscale-700"],
  {
    width: "fit-content",
    height: "2.4rem",
  },
]);

export const toggleWrapper = style([
  bgColor["main-50"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0.2rem",
    gap: "1rem",
    width: "11.2rem",
    borderRadius: "1.7rem",
  },
]);

export const numberChoice = style({
  width: "100%",
});

