import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { bgColor } from "@/shared/styles/color.css";

export const profileSection = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.2rem",
  padding: "1.6rem 0rem",
});

export const profileImage = style([
  bgColor["grayscale-50"],
  {
    width: "9.2rem",
    height: "9.2rem",
    borderRadius: vars.radius.full,
    position: "relative",
    overflow: "visible",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);

export const profileImagePlaceholder = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
});

export const cameraButton = style([
  bgColor["grayscale-100"],
  {
    width: "3.2rem",
    height: "3.2rem",
    padding: "0.4rem",
    border: `0.1rem solid ${vars.color.grayscale[0]}`,
    borderRadius: vars.radius.full,
    cursor: "pointer",
    position: "absolute",
    bottom: -5,
    right: -1,
    zIndex: vars.zIndex.contentOverlay,
  },
]);

export const cardContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "2.0rem 2.0rem 1.6rem",
  gap: "1.6rem",
  width: "100%",
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
  borderRadius: vars.radius.full,
});
