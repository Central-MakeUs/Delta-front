import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

const slideInFromRight = keyframes({
  from: { opacity: 0, transform: "translateX(28px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const slideInFromLeft = keyframes({
  from: { opacity: 0, transform: "translateX(-28px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const slideOutToLeft = keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(-28px)" },
});

const slideOutToRight = keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(28px)" },
});

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
  position: "fixed",
  width: "34rem",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: vars.color.grayscale[0],
  boxShadow: "0px 0px 14px rgba(88, 88, 88, 0.12)",
  borderRadius: "1.2rem",
  outline: "none",
});

export const viewStack = style({
  position: "relative",
  width: "34rem",
  height: "43.8rem",
  overflow: "hidden",
  transition: "height 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
});

export const viewStackCalendar = style({
  height: "43.8rem",
});

export const viewStackPicker = style({
  height: "36rem",
});

export const viewPanel = style({
  position: "absolute",
  inset: 0,
  width: "100%",
});

export const enterFromRight = style({
  animation: `${slideInFromRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});

export const enterFromLeft = style({
  animation: `${slideInFromLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});

export const exitToLeft = style({
  animation: `${slideOutToLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  pointerEvents: "none",
});

export const exitToRight = style({
  animation: `${slideOutToRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  pointerEvents: "none",
});


export const yearMonthPicker = style({
  position: "relative",
  width: "34rem",
  height: "36rem",
  backgroundColor: vars.color.grayscale[0],
  borderRadius: "1.2rem",
  boxShadow: "0px 0px 14px rgba(88, 88, 88, 0.12)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  overflow: "hidden",
});
