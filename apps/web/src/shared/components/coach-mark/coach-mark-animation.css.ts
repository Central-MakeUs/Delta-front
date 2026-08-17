import { keyframes, style } from "@vanilla-extract/css";

const fadeInFrames = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const riseInFrames = keyframes({
  from: { opacity: 0, transform: "translateY(1.6rem)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const fadeIn = style({
  animation: `${fadeInFrames} 0.45s ease-out both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const riseIn = style({
  animation: `${riseInFrames} 0.45s cubic-bezier(0.22, 1, 0.36, 1) both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
