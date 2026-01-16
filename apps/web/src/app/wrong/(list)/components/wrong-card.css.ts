import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { color, wrongCardGradient } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const card = style({
  position: "relative",
  width: "100%",
  aspectRatio: "358 / 230",
  overflow: "hidden",
  borderRadius: vars.radius.r12,
  isolation: "isolate",
  cursor: "pointer",
});

export const image = style({
  objectFit: "cover",
});

export const aboutSection = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlayElevated,
  height: "100%",
  padding: "1.6rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "1rem",
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
  gap: "0.8rem",
});

export const subChipRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
});

export const titleSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const title = style([color["grayscale-0"], typo.body1.bold]);

export const date = style([color["grayscale-0"], typo.body3.medium]);
