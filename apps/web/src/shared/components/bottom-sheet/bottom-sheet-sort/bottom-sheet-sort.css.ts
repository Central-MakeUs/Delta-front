import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { slideUp, slideDown, fadeIn, fadeOut } from "../styles/animations.css";

export const overlay = style([
  bgColor["overDim-40"],
  {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    animation: `${fadeIn} 0.3s ease-out`,
  },
]);

export const overlayClosing = style({
  animation: `${fadeOut} 0.3s ease-in`,
});

export const bottomSheet = style([
  bgColor["grayscale-0"],
  {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0 0 2rem",
    gap: "1rem",
    borderRadius: "2.4rem 2.4rem 0 0",
    zIndex: 1001,
    overflow: "auto",
    animation: `${slideUp} 0.3s ease-out`,
  },
]);

export const bottomSheetClosing = style({
  animation: `${slideDown} 0.3s ease-in`,
});

export const frameContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
});

export const headerFrame = style([
  bgColor["grayscale-0"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "2rem 1.6rem",
    gap: "1rem",
    width: "100%",
    flex: "none",
    alignSelf: "stretch",
    flexGrow: 0,
  },
]);

export const headerContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 0,
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    height: "2.7rem",
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
]);

export const closeButton = style([
  color["grayscale-900"],
  {
    width: "2.4rem",
    height: "2.4rem",
    flex: "none",
    order: 1,
    flexGrow: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    padding: 0,
  },
]);

export const listFrame = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 1.6rem",
  gap: "2rem",
  width: "100%",
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const listItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "1rem",
  width: "100%",
  height: "2.4rem",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
  cursor: "pointer",
  background: "transparent",
  border: "none",
  textAlign: "left",
});

export const listItemSelected = style({
  justifyContent: "space-between",
});

export const listItemText = style([
  typo.body2.medium,
  color["grayscale-600"],
  {
    height: "2.4rem",
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
]);

export const listItemTextSelected = style([
  typo.body2.semibold,
  color["grayscale-900"],
]);

export const checkIcon = style([
  color["grayscale-900"],
  {
    width: "2.4rem",
    height: "2.4rem",
    flex: "none",
    order: 1,
    flexGrow: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);
