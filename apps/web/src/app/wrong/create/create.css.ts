import { style } from "@vanilla-extract/css";
import { bgColor } from "@/shared/styles/color.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.8rem",
  padding: "2rem 0",
});

export const cardSection = style({
  display: "flex",
  flexDirection: "column",
  padding: "0 1.6rem",
  gap: "1.6rem",
});

export const stepShell = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
});

export const stepContent = style({
  minHeight: 0,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
  paddingBottom: "9.6rem",
});

export const nextSection = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    maxWidth: "43rem",
    width: "100%",
    margin: "0 auto",
    bottom: 0,
    zIndex: 10,
    padding: "1.6rem",
  },
]);

export const nextDisabled = style({
  pointerEvents: "none",
  cursor: "not-allowed",
});
