import { keyframes } from "@vanilla-extract/css";

export const slideUp = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

export const slideDown = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(100%)" },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});
