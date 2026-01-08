import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

const slideUp = keyframes({
  from: {
    transform: "translateY(100%)",
  },
  to: {
    transform: "translateY(0)",
  },
});

const slideDown = keyframes({
  from: {
    transform: "translateY(0)",
  },
  to: {
    transform: "translateY(100%)",
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

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
    padding: "0 0 20px",
    gap: "10px",
    borderRadius: "24px 24px 0 0",
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
    padding: "20px 16px",
    gap: "10px",
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
    height: "27px",
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
]);

export const closeButton = style([
  color["grayscale-900"],
  {
    width: "24px",
    height: "24px",
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
    color: vars.color.grayscale[900],
  },
]);

export const listFrame = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 16px",
  gap: "20px",
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
  gap: "10px",
  width: "100%",
  height: "24px",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
  cursor: "pointer",
});

export const listItemSelected = style({
  justifyContent: "space-between",
});

export const listItemText = style([
  typo.body2.medium,
  color["grayscale-600"],
  {
    height: "24px",
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
    width: "24px",
    height: "24px",
    flex: "none",
    order: 1,
    flexGrow: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: vars.color.grayscale[900],
  },
]);

