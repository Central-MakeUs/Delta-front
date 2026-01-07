import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const fillPercentVar = createVar();
export const tipOverlapVar = createVar();

const BAR_HEIGHT = "2.0rem";
const BAR_INSET_Y = "0.6rem";
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
  width: "100%",
  height: "3.2rem",
  position: "relative",
});

export const track = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: BAR_INSET_Y,
  height: BAR_HEIGHT,
  backgroundColor: vars.color.grayscale[0],
  borderRadius: vars.radius.full,
  zIndex: 0,
});

export const fill = style({
  position: "absolute",
  left: 0,
  top: BAR_INSET_Y,
  height: BAR_HEIGHT,
  width: fillPercentVar,
  backgroundColor: vars.color.main[500],
  borderRadius: vars.radius.full,
  zIndex: 1,
});

export const tip = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "2rem",
  left: `clamp(0%, calc(${fillPercentVar} - ${tipOverlapVar}), calc(100% - 2rem))`,
  backgroundColor: vars.color.main[500],
  zIndex: 1,
  WebkitMaskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  WebkitMaskPosition: "center",
  maskImage: `url("data:image/svg+xml,${TIP_MASK_SVG}")`,
  maskRepeat: "no-repeat",
  maskSize: "100% 100%",
  maskPosition: "center",
});

export const label = style({
  position: "absolute",
  right: "0.8rem",
  top: "1.6rem",
  transform: "translateY(-50%)",
  fontSize: "1.0rem",
  fontWeight: 500,
  lineHeight: "1.5rem",
  color: vars.color.grayscale[300],
  zIndex: 2,
});
