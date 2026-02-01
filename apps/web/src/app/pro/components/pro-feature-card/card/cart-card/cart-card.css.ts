import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const card = style([
  bgColor["grayscale-0"],
  {
    width: "15.7rem",
    height: "21.0rem",
    position: "relative",
    borderRadius: vars.radius.r12,
  },
]);

export const title = style([
  typo.caption.semibold,
  color["grayscale-700"],
  {
    position: "absolute",
    left: "1.2rem",
    top: "1.2rem",
    margin: 0,
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
});

export const barGray = style([bgColor["grayscale-200"]]);

export const barAccent = style([bgColor["main-200"]]);

export const divider = style([
  bgColor["grayscale-100"],
  {
    position: "absolute",
    left: "1.2rem",
    right: "1.2rem",
    top: "11.9rem",
    height: "0.05rem",
  },
]);

export const lineBox = style({
  position: "absolute",
  left: "1.2rem",
  top: "14.05rem",
  width: "13.35rem",
  height: "5.7rem",
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
});

export const dot = style([
  {
    fill: vars.color.main[100],
    stroke: vars.color.main[200],
    strokeWidth: 1.5,
  },
]);
