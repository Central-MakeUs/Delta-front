import { keyframes, style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const overlay = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,

    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        top: "60%",
        bottom: "-5%",
        background: "linear-gradient(180deg, #ffffff 0%, #FFDBD6 100%)",
        pointerEvents: "none",
      },
    },
  },
]);

export const center = style({
  position: "relative",
  zIndex: 1,
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
  borderRadius: "9999px",
  background:
    "conic-gradient(from -90deg, #FF604A 0deg 70deg, #FFEFED 70deg 360deg)",
  animation: `${spin} 1.1s linear infinite`,
  WebkitMask:
    "radial-gradient(farthest-side, transparent calc(100% - 0.8rem), #000 calc(100% - 0.8rem))",
  mask: "radial-gradient(farthest-side, transparent calc(100% - 0.8rem), #000 calc(100% - 0.8rem))",
});

export const icon = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const message = style([
  typo.body1.medium,
  color["grayscale-900"],
  {
    margin: 0,
    wordBreak: "keep-all",
  },
]);
