import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { slideUp, slideDown, fadeIn, fadeOut } from "../styles/animations.css";

export const overlay = style([
  bgColor["overDim-40"],
  {
    position: "fixed",
    inset: 0,
    zIndex: 15,
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
      },
    },
  },
]);

export const bottomSheet = style([
  bgColor["grayscale-0"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 16px",
    gap: "10px",
    position: "absolute",
    width: "390px",
    height: "fit-content",
    left: "calc(50% - 390px/2)",
    bottom: 0,
    background: "#FFFFFF",
    borderRadius: "24px 24px 0px 0px",
    outline: "none",
    selectors: {
      '&[data-state="open"]': {
        animation: `${slideUp} 0.3s ease-out both`,
      },
      '&[data-state="closing"]': {
        animation: `${slideDown} 0.3s ease-in both`,
      },
    },
  },
]);

export const contentContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "10px",
});

export const termsContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  flex: 1,
  overflowY: "auto",
  padding: "0 4px",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    marginBottom: "16px",
  },
]);

export const termsText = style([
  typo.body3.medium,
  color["grayscale-700"],
  bgColor["grayscale-50"],
  {
    width: "100%",
    height: "100%",
    padding: "1.2rem",
    borderRadius: "1.2rem",
  },
]);

export const buttonContainer = style({
  width: "100%",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
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
