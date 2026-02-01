import { keyframes, style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

const enterKeyframes = keyframes({
  from: { opacity: 0, transform: "translateY(-0.6rem)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const leaveKeyframes = keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(-0.6rem)" },
});

export const root = style([
  bgColor["grayscale-700"],
  color["grayscale-50"],
  {
    width: "100%",
    margin: "0 1.6rem",
    padding: "1.2rem",
    borderRadius: vars.radius.r12,
    display: "flex",
    flexDirection: "column",
    gap: "1.0rem",
    position: "relative",
  },
]);

export const frame = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const iconWrap = style({
  width: "2.4rem",
  height: "2.4rem",
  borderRadius: vars.radius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
});

export const iconSuccess = style([
  bgColor["success-500"],
  color["grayscale-0"],
]);
export const iconError = style([
  bgColor["warning-500"],
  color["grayscale-900"],
]);

export const icon = style({
  width: "2.0rem",
  height: "2.0rem",
});

export const message = style([
  typo.body3.medium,
  {
    flex: "1 1 0",
    wordBreak: "keep-all",
  },
]);

export const enter = style({
  animation: `${enterKeyframes} 160ms ease-out`,
});

export const leave = style({
  animation: `${leaveKeyframes} 140ms ease-in forwards`,
});

export const srOnly = style({
  position: "absolute",
  width: "0.1rem",
  height: "0.1rem",
  padding: 0,
  margin: "-0.1rem",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
