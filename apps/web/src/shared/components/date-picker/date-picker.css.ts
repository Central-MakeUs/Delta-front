import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

const zoomIn = keyframes({
  from: { opacity: 0, transform: "scale(0.8) translate(-50%, -50%)" },
  to: { opacity: 1, transform: "scale(1) translate(-50%, -50%)" },
});

const zoomOut = keyframes({
  from: { opacity: 1, transform: "scale(1) translate(-50%, -50%)" },
  to: { opacity: 0, transform: "scale(0.8) translate(-50%, -50%)" },
});

const slideInFromRight = keyframes({
  from: { opacity: 0, transform: "translateX(2.8rem)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const slideInFromLeft = keyframes({
  from: { opacity: 0, transform: "translateX(-2.8rem)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const slideOutToLeft = keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(-2.8rem)" },
});

const slideOutToRight = keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(2.8rem)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: vars.zIndex.modalOverlay,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  boxSizing: "border-box",
});

export const datePicker = style({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  width: "34rem",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: vars.color.grayscale[0],
  boxShadow: "0 0 1.4rem rgba(88, 88, 88, 0.12)",
  borderRadius: vars.radius.r12,
  animation: `${zoomIn} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  outline: "none",
  selectors: {
    "&:focus": { outline: "none" },
    "&:focus-visible": { outline: "none" },
    "&.closing": {
      animation: `${zoomOut} 0.2s ease-in forwards`,
    },
  },
});

export const viewStack = style({
  position: "relative",
  width: "100%",
  minHeight: "34rem",
  overflow: "hidden",
  transition:
    "height 0.6s cubic-bezier(0.2, 0.6, 0.36, 1), min-height 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
});

export const viewStackCalendar = style({
  minHeight: "55rem",
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
});

export const exitToLeft = style({
  animation: `${slideOutToLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});

export const exitToRight = style({
  animation: `${slideOutToRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});

export const enterFromLeft = style({
  animation: `${slideInFromLeft} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});

export const enterFromRight = style({
  animation: `${slideInFromRight} 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
});
