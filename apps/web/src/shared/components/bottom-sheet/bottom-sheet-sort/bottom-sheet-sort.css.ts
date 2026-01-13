import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { fadeIn, fadeOut, slideDown, slideUp } from "../styles/animations.css";

export const overlay = style([
  bgColor["overDim-40"],
  {
    position: "fixed",
    inset: 0,
    maxWidth: "43rem",
    width: "100%",
    margin: "0 auto",
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
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
    position: "relative",
    width: "100%",
    maxHeight: "56rem",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "2rem",
    borderRadius: `${vars.radius.r24} ${vars.radius.r24} 0 0`,
    zIndex: 1001,
    overflow: "auto",
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

export const frameContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const headerFrame = style({
  padding: "2rem 1.6rem",
});

export const headerContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const title = style([typo.body1.bold, color["grayscale-900"]]);

export const closeButton = style([
  color["grayscale-900"],
  {
    cursor: "pointer",
  },
]);

export const listFrame = style({
  display: "flex",
  flexDirection: "column",
  padding: "0 1.6rem",
  gap: "2rem",
});

export const listItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
});

export const listItemText = style([typo.body2.medium, color["grayscale-600"]]);
export const listItemTextSelected = style([
  typo.body2.semibold,
  color["grayscale-900"],
]);
export const checkIcon = style([color["grayscale-900"]]);
