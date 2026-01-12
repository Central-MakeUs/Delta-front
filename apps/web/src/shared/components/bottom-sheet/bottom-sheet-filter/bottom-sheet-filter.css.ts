import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { slideUp, slideDown, fadeIn, fadeOut } from "../styles/animations.css";

export const overlay = style([
  bgColor["overDim-40"],
  {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "43rem",
    width: "100%",
    margin: "0 auto",
    selectors: {
      '&[data-state="open"]': {
        animation: `${fadeIn} 0.3s ease-out both`,
      },
      '&[data-state="closing"]': {
        animation: `${fadeOut} 0.3s ease-in both`,
        pointerEvents: "none",
      },
    },
  },
]);

export const bottomSheet = style([
  bgColor["grayscale-0"],
  {
    width: "100%",
    maxHeight: "min(56rem, 100dvh)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    borderRadius: `${vars.radius.r24} ${vars.radius.r24} 0 0`,
    zIndex: 1001,
    selectors: {
      '&[data-state="open"]': {
        animation: `${slideUp} 0.35s ease-out both`,
      },
      '&[data-state="closing"]': {
        animation: `${slideDown} 0.35s ease-in both`,
      },
    },
  },
]);

export const frameContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: "1 1 auto",
  minHeight: 0,
});

export const headerFrame = style([
  {
    padding: "2rem 1.6rem",
  },
]);

export const headerContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const title = style([typo.body1.bold, color["grayscale-900"]]);

export const closeButton = style([
  color["grayscale-900"],
  {
    cursor: "pointer",
  },
]);

export const contentFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none",
  WebkitOverflowScrolling: "touch",
});

globalStyle(`${contentFrame}::-webkit-scrollbar`, {
  display: "none",
});

export const sectionFrame = style({
  display: "flex",
  flexDirection: "column",
  padding: "0 1.6rem",
  gap: "1.6rem",
  width: "100%",
});

export const sectionTitle = style([
  typo.body2.semibold,
  color["grayscale-800"],
]);

export const chipContainer = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "1.2rem",
  width: "100%",
});

export const dropdownSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const dropdownHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  width: "100%",
  cursor: "pointer",
});

export const triangleIcon = style({
  transform: "rotate(90deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.grayscale[700],
});

export const dropdownTitle = style([typo.body3.medium, color["grayscale-700"]]);

export const checkboxList = style({
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",
  width: "100%",
  flexWrap: "wrap",
});

export const buttonContainer = style([
  color["grayscale-700"],
  {
    display: "flex",
    padding: "2rem 1.6rem",
    gap: "1rem",
    flex: "0 0 auto",
  },
]);

export const resetButtonOverride = style({
  width: "13.4rem",
  minWidth: "13.4rem",
  flexGrow: 0,
});

export const applyButtonOverride = style({
  flex: "1 1 0%",
  flexGrow: 1,
});
