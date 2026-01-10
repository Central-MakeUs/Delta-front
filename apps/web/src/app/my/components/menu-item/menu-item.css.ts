import { style } from "@vanilla-extract/css";

export const item = style({
  width: "100%",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: "1.2rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.2rem",
});

export const left = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const right = style({
  display: "flex",
  alignItems: "center",
});
