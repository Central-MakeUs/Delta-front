import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const datePickerContent = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "17.5rem",
  height: "6.4rem",
});

export const navButton = style([
  typo.body1.medium,
  {
    cursor: "pointer",
    color: vars.color.grayscale[700],
    display: "flex",
    borderRadius: "0.4rem",
    transition: "background-color 0.2s ease",

    selectors: {
      "&:hover": {
        backgroundColor: vars.color.grayscale[100],
      },
      "&:active": {
        backgroundColor: vars.color.grayscale[200],
      },
    },
  },
]);

export const monthYearContainer = style({
  position: "relative",
  flex: 1,
  display: "flex",
  justifyContent: "center",
});

export const monthYear = style([
  typo.body2.medium,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.4rem 0.8rem",
    borderRadius: vars.radius.r4,
    color: vars.color.grayscale[800],
    transition: "background-color 0.2s ease",

    selectors: {
      "&:hover": {
        backgroundColor: vars.color.grayscale[100],
      },
      "&:active": {
        backgroundColor: vars.color.grayscale[200],
      },
    },
  },
]);

export const calendar = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "2rem",
  gap: "1.6rem",
});

export const weekDays = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.8rem",
  width: "100%",
});

export const weekDay = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
]);

export const days = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.8rem",
  width: "100%",
});

export const day = style([
  typo.body3.regular,
  {
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: vars.radius.r4,
    color: vars.color.grayscale[900],
    transition: "all 0.2s ease",

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: vars.color.grayscale[100],
      },
      "&:disabled": {
        cursor: "default",
      },
    },
  },
]);

export const selected = style([
  typo.body3.semibold,
  {
    color: `${vars.color.grayscale[0]} !important`,
    backgroundColor: `${vars.color.main[500]} !important`,
    borderRadius: vars.radius.full,
  },
]);

export const today = style({
  border: `2px solid ${vars.color.main[500]}`,
  borderRadius: vars.radius.full,
});

export const empty = style({
  cursor: "default",
  pointerEvents: "none",
});

export const prevMonth = style([
  typo.body3.regular,
  {
    color: vars.color.grayscale[500],
  },
]);

export const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "1.2rem",
  marginTop: "1.6rem",
});

globalStyle(`${buttonContainer} > *`, {
  flex: "1 1 0",
  minWidth: 0,
});
