import { keyframes, style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const overlay = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "43rem",
    height: "100dvh",
    overflow: "hidden",
    zIndex: vars.zIndex.modalOverlay,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        top: "60%",
        bottom: "-5%",
        background: `linear-gradient(180deg, ${vars.color.grayscale[0]} 0%, ${vars.color.main[100]} 100%)`,
        pointerEvents: "none",
      },
    },
  },
]);

export const backButton = style({
  position: "fixed",
  top: "1.2rem",
  left: "1.6rem",
  zIndex: vars.zIndex.modal,
});

export const center = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlay,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  textAlign: "center",
});

export const spinnerBox = style({
  position: "relative",
  width: "10rem",
  height: "10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ring = style({
  position: "absolute",
  inset: 0,
  borderRadius: vars.radius.full,
  background: `conic-gradient(from -90deg, ${vars.color.main[500]} 0deg 52deg, ${vars.color.main[50]} 52deg 360deg)`,
  animation: `${spin} 1.2s linear infinite`,

  WebkitMask: `radial-gradient(
    farthest-side,
    transparent calc(100% - 0.5rem),
    ${vars.color.grayscale[1000]} calc(100% - 0.5rem)
  )`,
  mask: `radial-gradient(
    farthest-side,
    transparent calc(100% - 0.5rem),
    ${vars.color.grayscale[1000]} calc(100% - 0.5rem)
  )`,

  selectors: {
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "0.5rem",
      height: "0.5rem",
      backgroundColor: bgColor["main-500"],
      borderRadius: vars.radius.full,
      transformOrigin: "50% 50%",
    },
    "&::before": {
      transform: "translate(-50%, -50%) rotate(-90deg) translateY(-4.75rem)",
    },
    "&::after": {
      transform: "translate(-50%, -50%) rotate(-38deg) translateY(-4.75rem)",
    },
  },
});

export const icon = style({
  position: "relative",
  zIndex: vars.zIndex.contentOverlay,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const message = style([typo.body1.medium, color["grayscale-900"]]);
