import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const fillPercentVar = createVar();
export const tipOverlapVar = createVar();
export const motionMsVar = createVar();
export const fillMaskVar = createVar();

const BAR_HEIGHT = "2.0rem";
const BAR_INSET_Y = "0.6rem";
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

const ZERO_FILL_MASK_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path
    d="
      M85 0
      H70
      Q100 0 100 30
      V70
      Q100 100 70 100
      H85
      Q0 100 0 50
      Q0 0 85 0
      Z
    "
    fill="black"
  />
</svg>
`);

export const zeroFillMaskUrl = `url("data:image/svg+xml,${ZERO_FILL_MASK_SVG}")`;

export const root = style({
  vars: {
    [fillPercentVar]: "0%",
    [tipOverlapVar]: "1.2rem",
    [motionMsVar]: "900ms",
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
    zIndex: vars.zIndex.base,
  },
]);

export const fill = style([
  bgColor["main-500"],
  {
    vars: {
      [fillMaskVar]: "none",
    },
    position: "absolute",
    left: 0,
    top: BAR_INSET_Y,
    height: BAR_HEIGHT,
    width: fillPercentVar,
    minWidth: tipOverlapVar,
    borderRadius: vars.radius.full,
    WebkitMaskImage: fillMaskVar,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    WebkitMaskPosition: "center",
    maskImage: fillMaskVar,
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    maskPosition: "center",
    zIndex: vars.zIndex.contentOverlay,
    transitionProperty: "width",
    transitionDuration: motionMsVar,
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
    width: "2.0rem",
    left: `clamp(0%, calc(${fillPercentVar} - ${tipOverlapVar}), calc(100% - 2.0rem))`,
    zIndex: vars.zIndex.contentOverlay,
    WebkitMaskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    WebkitMaskPosition: "center",
    maskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    maskPosition: "center",
    transitionProperty: "left",
    transitionDuration: motionMsVar,
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
    zIndex: vars.zIndex.contentOverlayHigh,
    whiteSpace: "nowrap",
  },
]);
