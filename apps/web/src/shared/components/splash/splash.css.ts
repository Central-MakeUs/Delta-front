import { keyframes, style } from "@vanilla-extract/css";
import { bgColor } from "@/shared/styles/color.css";

const splashOut = keyframes({
  "0%": { opacity: 1 },
  "90%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const overlay = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    inset: 0,
    zIndex: 20,
    width: "100%",
    maxWidth: "43rem",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: `${splashOut} 5s ease-out forwards`,
  },
]);

export const image = style({
  objectFit: "contain",
  width: "18.2rem",
});
