import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor } from "@/shared/styles/color.css";

export const bottomButtonContainer = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    maxWidth: "43rem",
    bottom: 0,
    padding: "1.6rem",
    width: "100%",
    display: "flex",
    zIndex: vars.zIndex.bottomNav,

    "@supports": {
      "(padding-bottom: env(safe-area-inset-bottom))": {
        paddingBottom: "calc(1.6rem + env(safe-area-inset-bottom))",
      },
      "(padding-bottom: constant(safe-area-inset-bottom))": {
        paddingBottom: "calc(1.6rem + constant(safe-area-inset-bottom))",
      },
    },
  },
]);
