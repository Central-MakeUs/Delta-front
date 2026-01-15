import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const bottomButtonContainer = style({
  position: "fixed",
  maxWidth: "43rem",
  width: "100%",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  background: vars.color.grayscale[0],
  zIndex: 10,
});

export const bottomButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.6rem",
  gap: "1.2rem",
  width: "100%",
  height: "8rem",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
});
