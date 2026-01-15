import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor } from "@/shared/styles/color.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  position: "relative",
  width: "100%",
  minHeight: "100vh",
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
  flex: "none",
});

export const inputSection = style([
  bgColor["grayscale-50"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.2rem",
    gap: "1rem",
    width: "100%",
    flex: "none",
    order: 1,
    alignSelf: "stretch",
    flexGrow: 0,
  },
]);

export const inputContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
  flex: "none",
});
