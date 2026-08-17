import { style } from "@vanilla-extract/css";
import { bgColor } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";
import { APP_BAR_HEIGHT } from "@/shared/components/app-bar/constants/app-bar";
import { fadeIn, riseIn } from "@/shared/components/coach-mark/coach-mark-animation.css";

export const overlay = style([
  bgColor["grayscale-0"],
  fadeIn,
  {
    position: "fixed",
    top: APP_BAR_HEIGHT,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "43rem",
    zIndex: vars.zIndex.coachMark,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
]);

export const body = style([
  riseIn,
  {
    flex: "1 1 auto",
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "6.4rem 1.6rem 0",
    boxSizing: "border-box",
  },
]);

export const footer = style({
  flex: "0 0 auto",
  padding: "1.6rem",
  boxSizing: "border-box",
});
