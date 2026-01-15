import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: 0,
  width: "100%",
  maxWidth: "39rem",
  margin: "0 auto",
  minHeight: "100vh",
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 1.6rem",
  gap: "2.4rem",
  width: "100%",
  flex: "1 1 auto",
});
