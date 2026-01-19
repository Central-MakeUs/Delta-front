import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const header = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "34rem",
  height: "6.4rem",
});

export const headerRow = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  width: "34rem",
  height: "4.8rem",
});

export const yearNavButton = style({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "0.4rem",
  transition: "background-color 0.2s ease",
  outline: "none",
  selectors: {
    "&:focus": {
      backgroundColor: vars.color.grayscale[200],
    },
    "&:focus:not(:active)": {
      backgroundColor: "transparent",
    },
  },
});

export const yearDisplay = style([
  typo.body2.medium,
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.2rem 1rem",
    gap: "1rem",
    width: "10.2rem",
    height: "4.8rem",
    textAlign: "center",
    color: vars.color.grayscale[800],
  },
]);

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 1.2rem 0.4rem",
  width: "34rem",
  height: "21.2rem",
});

export const yearSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.6rem",
  width: "31.6rem",
  height: "20.8rem",
});

export const yearGrid = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.6rem",
  width: "31.6rem",
  height: "20.8rem",
});

export const yearRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "31.6rem",
  height: "4rem",
});

export const yearOption = style([
  typo.body3.medium,
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.8rem 1.2rem",
    gap: "0.8rem",
    width: "10rem",
    height: "4rem",
    flex: "none",
    order: 0,
    flexGrow: 0,
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.8rem",
    color: vars.color.grayscale[700],
    transition: "all 0.2s ease",
    textAlign: "center",

    selectors: {
      "&:hover": {
        backgroundColor: vars.color.grayscale[100],
      },
    },
  },
]);

export const selectedYear = style([
  typo.body3.semibold,
  {
    color: `${vars.color.grayscale[0]} !important`,
    backgroundColor: `${vars.color.main[500]} !important`,
  },
]);

export const footer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: "1.6rem 2rem 2rem",
  gap: "1.2rem",
  width: "34rem",
  backgroundColor: vars.color.grayscale[0],
  borderRadius: "0 0 1.6rem 1.6rem",
});

globalStyle(`${footer} > *`, {
  flex: "1 1 0",
  minWidth: 0,
});
