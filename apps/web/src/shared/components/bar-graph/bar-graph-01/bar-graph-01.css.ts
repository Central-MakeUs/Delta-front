import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const fillPercentVar = createVar();
export const tipOverlapVar = createVar();

const BAR_HEIGHT = "2.0rem";
const BAR_INSET_Y = "0.6rem";
const TRANSITION_MS = "750ms";
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const TIP_MASK_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" preserveAspectRatio="none">
  <path
    d="M0 10
       L0 150
       Q0 160 7.81 153.75
       L92.19 86.25
       Q100 80 92.19 73.75
       L7.81 6.25
       Q0 0 0 10 Z"
    fill="black"
  />
</svg>
`);

export const root = style({
  vars: {
    [fillPercentVar]: "0%",
    [tipOverlapVar]: "1.2rem",
  },
  width: "100%",
  height: "3.2rem",
  position: "relative",
});

export const track = style([
  bgColor["grayscale-0"],
  {
    position: "absolute",
    left: 0,
    right: 0,
    top: BAR_INSET_Y,
    height: BAR_HEIGHT,
    borderRadius: vars.radius.full,
    zIndex: 0,
  },
]);

export const fill = style([
  bgColor["main-500"],
  {
    position: "absolute",
    left: 0,
    top: BAR_INSET_Y,
    height: BAR_HEIGHT,
    width: fillPercentVar,
    borderRadius: vars.radius.full,
    zIndex: 1,
    transitionProperty: "width",
    transitionDuration: TRANSITION_MS,
    transitionTimingFunction: EASING,
    willChange: "width",

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transitionDuration: "0ms",
      },
    },
  },
]);

export const tip = style([
  bgColor["main-500"],
  {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "2rem",
    left: `clamp(0%, calc(${fillPercentVar} - ${tipOverlapVar}), calc(100% - 2.0rem))`,
    zIndex: 1,
    WebkitMaskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    WebkitMaskPosition: "center",
    maskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    maskPosition: "center",
    transitionProperty: "left",
    transitionDuration: TRANSITION_MS,
    transitionTimingFunction: EASING,
    willChange: "left",

    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transitionDuration: "0ms",
      },
    },
  },
]);

export const label = style([
  typo.caption.medium,
  color["grayscale-300"],
  {
    position: "absolute",
    right: "0.8rem",
    top: "1.6rem",
    transform: "translateY(-50%)",
    zIndex: 2,
    whiteSpace: "nowrap",
  },
]);
