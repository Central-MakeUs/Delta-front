import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

const rotateStepped = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const rotatingIcon = style({
  animation: `${rotateStepped} 2s steps(4, end) infinite`,
});

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
  position: "relative",
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
  overflow: "hidden",
});

export const innerContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.6rem",
  transition: "filter 0.2s",
});

export const innerContentBlur = style({
  filter: "blur(4px)",
  pointerEvents: "none",
  userSelect: "none",
});

export const loadingOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.6rem",
});

export const loadingText = style([
  typo.body2.medium,
  {
    color: vars.color.grayscale[700],
  },
]);

export const solutionPlainText = style([
  typo.body2.regular,
  {
    color: vars.color.grayscale[900],
    width: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    padding: "1.6rem",
    overflowY: "auto",
    flex: 1,
    alignSelf: "stretch",
  },
]);

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
