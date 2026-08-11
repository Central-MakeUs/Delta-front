import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color, wrongCardGradient } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const card = style({
  position: "relative",
  width: "100%",
  aspectRatio: "171 / 173",
  overflow: "hidden",
  borderRadius: vars.radius.r8,
  isolation: "isolate",
});

export const image = style({
  objectFit: "cover",
  objectPosition: "top left",
});

export const tag = style([
  typo.caption.semibold,
  color["grayscale-0"],
  bgColor["main-500"],
  {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: vars.zIndex.contentOverlayHigh,
    padding: "0.4rem 1.2rem",
    borderBottomLeftRadius: vars.radius.r8,
  },
]);

export const aboutSection = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlayHigh,
  height: "100%",
  padding: "1.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "0.8rem",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: vars.zIndex.background,
      background: wrongCardGradient["wrong-card-gradient"],
      pointerEvents: "none",
    },
  },
});

export const chipRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
});

export const title = style([color["grayscale-0"], typo.body2.bold]);
