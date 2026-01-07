import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const root = style([
  bgColor["main-50"],
  {
    position: "relative",
    overflow: "hidden",
    borderRadius: vars.radius.r20,
    padding: "2.0rem 1.6rem",
  },
]);

export const content = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "2.0rem",
  alignItems: "flex-start",
});

export const topRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const chip = style([
  typo.body3.semibold,
  bgColor["grayscale-0"],
  color["grayscale-700"],
  {
    borderRadius: vars.radius.r20,
    padding: "0.4rem 1.2rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
]);

export const caption = style([
  typo.caption.medium,
  color["grayscale-500"],
  {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
]);

export const bottom = style({
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const bottomTopRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const percent = style([
  typo.h2,
  color["main-500"],
  {
    whiteSpace: "nowrap",
  },
]);

export const action = style({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

export const actionText = style([
  typo.body3.semibold,
  color["grayscale-600"],
  {
    whiteSpace: "nowrap",
  },
]);

export const actionIcon = style([color["grayscale-600"]]);

const TRIANGLE_BLUR_MASK_SVG = encodeURIComponent(`
<svg width="266" height="165" viewBox="0 0 266 165" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="f" x="-60" y="-60" width="386" height="285" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>

  <g filter="url(#f)">
    <path d="M0 0 L205 165 L0 165 Z" fill="white"/>
  </g>
</svg>
`);

export const vector = style([
  bgColor["main-100"],
  {
    position: "absolute",
    left: 0,
    top: "-0.6rem",
    width: "26.6rem",
    height: "16.5rem",
    opacity: 0.8,
    borderRadius: "0.5px",
    pointerEvents: "none",
    WebkitMaskImage: `url("data:image/svg+xml,${TRIANGLE_BLUR_MASK_SVG}")`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    WebkitMaskPosition: "left top",
    maskImage: `url("data:image/svg+xml,${TRIANGLE_BLUR_MASK_SVG}")`,
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    maskPosition: "left top",
  },
]);
