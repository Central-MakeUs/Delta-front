import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const bottomButtonContainer = style({
  position: "fixed",
  maxWidth: "43rem",
  width: "100%",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  background: vars.color.grayscale[0],
  zIndex: vars.zIndex.bottomNav,
});

export const bottomButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.6rem",
  gap: "1.2rem",
  width: "100%",
  height: "8rem",

  "@supports": {
    "(padding-bottom: env(safe-area-inset-bottom))": {
      paddingBottom: "calc(1.6rem + env(safe-area-inset-bottom))",
    },
    "(padding-bottom: constant(safe-area-inset-bottom))": {
      paddingBottom: "calc(1.6rem + constant(safe-area-inset-bottom))",
    },
  },
});
