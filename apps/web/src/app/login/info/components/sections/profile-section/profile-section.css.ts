import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const profileSection = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.2rem",
  padding: "1.6rem 0rem",
});

export const profileImage = style({
  width: "92px",
  height: "92px",
  backgroundColor: vars.color.grayscale[50],
  borderRadius: "50%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const profileImagePlaceholder = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const cameraButton = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  gap: "10px",
  width: "32px",
  height: "32px",
  backgroundColor: vars.color.grayscale[100],
  border: `1px solid ${vars.color.grayscale[0]}`,
  borderRadius: "100px",
  cursor: "pointer",
  marginTop: "-3rem",
  zIndex: 10,
});
