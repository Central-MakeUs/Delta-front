import { style } from "@vanilla-extract/css";

export const base = style({
  display: "inline-block",
  verticalAlign: "middle",
});

export const rotate0 = style({ transform: "rotate(0deg)" });
export const rotate90 = style({ transform: "rotate(90deg)" });
export const rotate180 = style({ transform: "rotate(180deg)" });
export const rotate270 = style({ transform: "rotate(270deg)" });
