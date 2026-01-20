import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";
import { slideUp, slideDown, fadeIn, fadeOut } from "../styles/animations.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: vars.zIndex.bottomSheetOverlay,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  maxWidth: "43rem",
  width: "100%",
  margin: "0 auto",
  backgroundColor: vars.color.overDim[40],
  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 0.3s ease-out both`,
    },
    '&[data-state="closing"]': {
      animation: `${fadeOut} 0.3s ease-in both`,
    },
  },
});

export const bottomSheet = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 1.6rem",
  gap: "1rem",
  position: "fixed",
  maxWidth: "43rem",
  width: "100%",
  bottom: 0,
  backgroundColor: vars.color.grayscale[0],
  borderRadius: "2.4rem 2.4rem 0 0",
  outline: "none",
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideUp} 0.3s ease-out both`,
    },
    '&[data-state="closing"]': {
      animation: `${slideDown} 0.3s ease-in both`,
    },
  },
});

export const contentContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "2rem",
});

export const termsContent = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "auto",
  padding: "0 0.4rem",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    padding: "0 0 1.6rem",
  },
]);

export const termsText = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    width: "100%",
    height: "100%",
    padding: "1.2rem",
    borderRadius: "1.2rem",
    backgroundColor: vars.color.grayscale[50],
  },
]);

export const buttonContainer = style({
  width: "100%",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

export const cancelText = style([
  typo.body3.medium,
  color["grayscale-500"],
  {
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    transition: "color 0.2s ease",

    selectors: {
      "&:hover": {
        color: vars.color.grayscale[700],
      },
      "&:disabled": {
        cursor: "not-allowed",
      },
      "&:disabled:hover": {
        color: vars.color.grayscale[500],
      },
    },
  },
]);
