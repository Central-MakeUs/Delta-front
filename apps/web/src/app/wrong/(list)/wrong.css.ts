import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  padding: "1.2rem 1.6rem",
  gap: "2rem",
});

export const filterSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const filterRow = style([
  {
    display: "flex",
    gap: "0.8rem",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    selectors: {
      "&::-webkit-scrollbar": { display: "none" },
    },
  },
]);

export const sortRow = style([
  {
    display: "flex",
    justifyContent: "space-between",
  },
]);

export const wrongLabel = style([
  typo.body2.semibold,
  color["grayscale-700"],
  {
    display: "flex",
  },
]);

export const wrongCount = style([color["main-500"]]);

export const cardSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const emptyStateWrap = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  minHeight: "50vh",
});

export const emptyStateIconWrap = style([
  bgColor["grayscale-50"],
  color["grayscale-500"],
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5.6rem",
    height: "5.6rem",
    borderRadius: vars.radius.r32,
  },
]);

export const emptyStateText = style([
  typo.body1.medium,
  color["grayscale-700"],
  {
    textAlign: "center",
  },
]);
