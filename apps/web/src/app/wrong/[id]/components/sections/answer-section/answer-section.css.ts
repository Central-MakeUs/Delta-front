import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";

export const answerButtonWrapper = style({
  position: "relative",
  width: "100%",
  height: "5rem",
  borderRadius: vars.radius.r12,
  overflow: "hidden",
});

export const answerButtonOverlay = style({
  position: "absolute",
  width: "100%",
  height: "5rem",
  left: 0,
  top: 0,
  background: "rgba(214, 214, 214, 0.1)",
  backdropFilter: "blur(0.6rem)",
  WebkitBackdropFilter: "blur(0.6rem)",
  display: "flex",
  alignItems: "center",
  padding: "1.3rem 7.3rem",
  gap: "1rem",
  zIndex: 1,
});

export const answerButtonContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "0.8rem",
  flex: "none",
  order: 0,
  flexGrow: 0,
});

export const answerChipWrapper = style([
  bgColor["grayscale-0"],
  vars.radius.r12,
  {
    display: "flex",
    alignItems: "center",
    padding: "1.2rem",
    gap: "0.8rem",
    justifyContent: "space-between",
  },
]);

export const answerChipButton = style({
  display: "flex",
  alignItems: "center",
  zIndex: 2,
});

export const answerChipContent = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const answerNumber = style([typo.body3.medium, color["grayscale-700"]]);

export const answerButtonText = style([
  typo.body3.semibold,
  color["main-500"],
  {
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const answerToggleButton = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  zIndex: 2,
});

export const answerToggleButtonDisabled = style({
  cursor: "default",
  zIndex: 0,
});
