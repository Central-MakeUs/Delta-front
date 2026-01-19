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
  overflow: "visible",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const profileImagePlaceholder = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const cameraButton = style({
  width: "3.2rem",
  height: "3.2rem",
  padding: "0.4rem",
  backgroundColor: vars.color.grayscale[100],
  border: `1px solid ${vars.color.grayscale[0]}`,
  borderRadius: "100px",
  cursor: "pointer",
  position: "absolute",
  bottom: -5,
  right: -5,
  zIndex: 10,
});

export const modalContent = style({
  width: "100%",
  maxWidth: "34rem",
  padding: "2rem 2rem 1.6rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const cardSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  width: "100%",
});

export const inputDisplay = style({
  display: "none",
});

export const profileImagePreview = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
});
