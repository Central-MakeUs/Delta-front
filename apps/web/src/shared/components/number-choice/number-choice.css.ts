import { style } from "@vanilla-extract/css";

export const root = style({
  maxWidth: "100%",
  gap: "0.8rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const item = style({
  width: "auto",
  flex: "1 1 0",
  minWidth: 0,
});
