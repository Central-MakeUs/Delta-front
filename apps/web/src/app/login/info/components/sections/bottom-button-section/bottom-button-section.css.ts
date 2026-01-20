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
    zIndex: vars.zIndex.bottomNav,
  },
]);
