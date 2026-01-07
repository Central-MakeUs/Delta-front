import { style } from "@vanilla-extract/css";

export const root = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const tabList = style({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
});

export const rightSlot = style({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
});
