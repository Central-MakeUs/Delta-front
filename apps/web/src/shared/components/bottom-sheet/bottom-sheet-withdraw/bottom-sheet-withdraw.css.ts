import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
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
    zIndex: 15,
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
    maxHeight: "54rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1.6rem",
    gap: "1rem",
    borderRadius: "2.4rem 2.4rem 0 0",
    zIndex: 16,
    overflow: "auto",
    animation: `${slideUp} 0.3s ease-out`,
  },
]);

export const bottomSheetClosing = style({
  animation: `${slideDown} 0.3s ease-in`,
});

export const contentContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "3.2rem",
  width: "100%",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.2rem",
  width: "100%",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    width: "100%",
    textAlign: "left",
  },
]);

export const descriptionWrapper = style([
  bgColor["grayscale-50"],
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.2rem",
    gap: "1rem",
    width: "100%",
    borderRadius: vars.radius.r12,
  },
]);

export const description = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    width: "100%",
    textAlign: "start",
  },
]);

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1.2rem",
  width: "100%",
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
