import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const bottomButtonContainer = style({
  position: "fixed",
  width: "100%",
  height: "10.1rem",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  background: vars.color.grayscale[0],
  zIndex: 100,
});

export const bottomButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.6rem",
  gap: "1.2rem",
  width: "100%",
  height: "8rem",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const bottomButton = style([
  bgColor["main-500"],
  color["grayscale-0"],
  typo.body2.semibold,
  {
    width: "100%",
    height: "4.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    flex: "none",
    borderRadius: "1.2rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    selectors: {
      "&:disabled": {
        backgroundColor: vars.color.grayscale[300],
        color: vars.color.grayscale[500],
        cursor: "not-allowed",
        opacity: 0.6,
      },
    },
  },
]);
