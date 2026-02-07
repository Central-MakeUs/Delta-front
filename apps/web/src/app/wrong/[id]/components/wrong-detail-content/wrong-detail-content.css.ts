import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingBottom: "6rem",
  position: "relative",
  width: "100%",
  backgroundColor: vars.color.grayscale[0],
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "2rem 1.6rem",
  gap: "1rem",
  width: "100%",
  flex: "1 1 0%",
});

export const mainContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "2rem",
  width: "100%",
});

export const inputSection = style([
  bgColor["grayscale-50"],
  {
    borderRadius: vars.radius.r16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.2rem",
    gap: "1rem",
    width: "100%",
  },
]);

export const inputContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  cursor: "default",
  gap: "1.2rem",
  width: "100%",
});

export const emptyStateLabel = style([
  typo.body2.medium,
  color["grayscale-700"],
  {
    textAlign: "center",
  },
]);
