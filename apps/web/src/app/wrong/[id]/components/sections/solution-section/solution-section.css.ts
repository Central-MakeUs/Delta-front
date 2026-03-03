import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const solutionInputWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.8rem",
  width: "100%",
  height: "27rem",
  flex: 1,
  minHeight: 0,
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.6rem",
  width: "100%",
  minHeight: "200px",
  flex: 1,
  borderRadius: vars.radius.r12,
  border: `0.1rem solid ${vars.color.grayscale[100]}`,
  backgroundColor: vars.color.grayscale[0],
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
});

export const titleText = style([
  typo.body2.regular,
  {
    color: vars.color.grayscale[400],
  },
]);
