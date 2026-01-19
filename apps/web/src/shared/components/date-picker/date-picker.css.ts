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
  minHeight: "34rem",
  overflow: "hidden",
  transition: "height 0.6s cubic-bezier(0.2, 0.6, 0.36, 1), min-height 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
});

export const viewStackCalendar = style({
  minHeight: "39.8rem",
});

export const viewStackPicker = style({
  minHeight: "34rem",
});

export const viewPanel = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "auto",
  zIndex: 0,
});


export const exitToLeft = style({
  animation: `${slideOutToLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  pointerEvents: "none",
  zIndex: 0,
});

export const exitToRight = style({
  animation: `${slideOutToRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  pointerEvents: "none",
  zIndex: 0,
});

export const enterFromLeft = style({
  animation: `${slideInFromLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  zIndex: 1,
});

export const enterFromRight = style({
  animation: `${slideInFromRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
  zIndex: 1,
});


 
