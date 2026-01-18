import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
});

export const datePicker = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  position: "absolute",
  width: "34rem",
  left: "calc(50% - 34rem / 2)",
  top: "calc(50% - 46.8rem / 2)",
  backgroundColor: vars.color.grayscale[0],
  boxShadow: "0px 0px 14px rgba(88, 88, 88, 0.12)",
  borderRadius: "1.2rem",
  outline: "none",
});

export const header = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "1rem",
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
    borderRadius: "0.4rem",
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

export const dropdownIcon = style({
  transition: "transform 0.2s ease",
  transform: "rotate(0deg)",
});

export const dropdownIconOpen = style({
  transform: "rotate(180deg)",
});

export const yearDropdown = style({
  position: "absolute", 
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  marginTop: "0.4rem",
  backgroundColor: vars.color.grayscale[0],
  borderRadius: "0.8rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  border: `1px solid ${vars.color.grayscale[100]}`,
  zIndex: 1001,
  minWidth: "12rem",
  maxHeight: "20rem",
  overflow: "hidden",
});

export const yearDropdownList = style({
  display: "flex",
  flexDirection: "column",
  maxHeight: "20rem",
  overflowY: "auto",
  padding: "0.4rem",
  gap: "0.2rem",
});

export const yearOption = style([
  typo.body2.regular,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.8rem 1.2rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.4rem",
    color: vars.color.grayscale[900],
    transition: "all 0.2s ease",
    textAlign: "center",
    width: "100%",

    selectors: {
      "&:hover": {
        backgroundColor: vars.color.grayscale[100],
      },
    },
  },
]);

export const selectedYear = style([
  typo.body2.semibold,
  {
    color: `${vars.color.grayscale[0]} !important`,
    backgroundColor: `${vars.color.main[500]} !important`,
  },
]);

export const calendar = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "2rem",
  gap: "1.6rem",
});

export const weekDays = style([
  {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.8rem",
  width: "100%",
}]);

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

export const days = style([
  {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.8rem",
  width: "100%",
  }
]);

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
    borderRadius: "0.4rem",
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
    borderRadius: "10rem",
    fontWeight: "600",
  },
]);

export const today = style({
  border: `2px solid ${vars.color.main[500]}`,
  borderRadius: "10rem",
  fontWeight: "600",
});

export const empty = style({
  cursor: "default",
  pointerEvents: "none",
});

export const prevMonth = style([
  typo.body3.regular,
  {
  color: vars.color.grayscale[500],
  }
]);

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
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