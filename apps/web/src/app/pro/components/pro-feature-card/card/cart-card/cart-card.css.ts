import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

const introTilt = keyframes({
  "0%": {
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  "45%": {
    transform:
      "perspective(600px) rotateX(6deg) rotateY(-7deg) translateY(-0.2rem)",
    boxShadow:
      "0 1.2rem 3.2rem rgba(0,0,0,0.10), 0 0.8rem 1.6rem rgba(0,0,0,0.06)",
  },
  "100%": {
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
});

const introSheen = keyframes({
  "0%": { opacity: 0 },
  "45%": { opacity: 0.75 },
  "100%": { opacity: 0 },
});

const introGlow = keyframes({
  "0%": { opacity: 0 },
  "45%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const card = style({
  width: "100%",
  height: "21.0rem",
  position: "relative",
  borderRadius: vars.radius.r12,
  transformStyle: "preserve-3d",
  willChange: "transform",
  transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      willChange: "auto",
    },
  },
});

export const introOn = style({
  animation: `${introTilt} 900ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const surface = style([
  bgColor["grayscale-0"],
  {
    position: "absolute",
    inset: 0,
    borderRadius: vars.radius.r12,
    overflow: "hidden",
  },
]);

export const sheen = style({
  position: "absolute",
  inset: 0,
  opacity: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(60% 70% at var(--mx, 50%) var(--my, 20%), rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.0) 60%)",
  selectors: {
    [`${introOn} &`]: {
      animation: `${introSheen} 900ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        [`${introOn} &`]: { animation: "none" },
      },
    },
  },
});

export const glow = style({
  position: "absolute",
  inset: "-1.2rem",
  opacity: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(40% 40% at var(--mx, 50%) var(--my, 30%), rgba(255, 96, 74, 0.22) 0%, rgba(255, 96, 74, 0) 70%)",
  selectors: {
    [`${introOn} &`]: {
      animation: `${introGlow} 900ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        [`${introOn} &`]: { animation: "none" },
      },
    },
  },
});

export const title = style([
  typo.caption.semibold,
  color["grayscale-700"],
  {
    position: "absolute",
    left: "1.2rem",
    top: "1.2rem",
  },
]);

export const bars = style({
  position: "absolute",
  left: "1.2rem",
  top: "3.8rem",
  height: "6.1rem",
  display: "flex",
  alignItems: "flex-end",
  gap: "0.7rem",
});

export const bar = style({
  width: "2.8rem",
  borderRadius: vars.radius.r4,
  transformOrigin: "bottom",
  transform: "scaleY(0)",
  transition: "transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  willChange: "transform",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
      transform: "scaleY(1)",
    },
  },
});

export const barsOn = style({
  transform: "scaleY(1)",
});

export const barGray = style([bgColor["grayscale-100"]]);
export const barAccent = style([bgColor["main-200"]]);

export const divider = style([
  bgColor["grayscale-100"],
  {
    position: "absolute",
    left: "1.2rem",
    right: "1.2rem",
    top: "11.4rem",
    height: "0.05rem",
  },
]);

export const lineBox = style({
  position: "absolute",
  left: "1.2rem",
  top: "13rem",
  width: "13.35rem",
  height: "7.6rem",
  boxSizing: "border-box",
});

export const lineSvg = style({
  width: "100%",
  height: "100%",
  display: "block",
});

export const gridLine = style([
  bgColor["grayscale-50"],
  {
    strokeWidth: 0.5,
  },
]);

export const linePath = style({
  fill: "none",
  stroke: vars.color.grayscale[50],
  strokeWidth: 1.2,
  strokeDasharray: "var(--dash, 1)",
  strokeDashoffset: "var(--dash, 1)",
  transition: "stroke-dashoffset 900ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  willChange: "stroke-dashoffset",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
      strokeDashoffset: "0",
    },
  },
});

export const lineOn = style({
  strokeDashoffset: "0",
});

export const dot = style({
  fill: vars.color.main[100],
  stroke: vars.color.main[200],
  strokeWidth: 1.5,
  opacity: 0,
  transform: "scale(0.6)",
  transition:
    "opacity 300ms ease, transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  transformOrigin: "center",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
      opacity: 1,
      transform: "scale(1)",
    },
  },
});

export const dotOn = style({
  opacity: 1,
  transform: "scale(1)",
});
