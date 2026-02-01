import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const root = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1.6rem",
  padding: "2.4rem 2.8rem",
});

export const pillRow = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const pill = style([
  bgColor["grayscale-50"],
  {
    padding: "0.4rem 0",
    borderRadius: vars.radius.r64,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
  },
]);

export const pillText = style([
  typo.caption.semibold,
  color["grayscale-700"],
  { whiteSpace: "nowrap" },
]);

export const artwork = style({
  width: "100%",
  position: "relative",
  minHeight: "12.0rem",
});

export const pdfWrap = style({
  width: "6.55rem",
  height: "8.2rem",
  position: "absolute",
  left: "0",
  top: "0",
  willChange: "transform, opacity",
});

export const arrowWrap = style({
  width: "7.75rem",
  height: "7.75rem",
  position: "absolute",
  right: "0",
  top: "4rem",
  zIndex: "1",
  pointerEvents: "none",
  transformOrigin: "20% 30%",
  willChange: "transform, opacity",
});

const enter = keyframes({
  from: { opacity: 0, transform: "translateY(0.8rem) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const pdfTap = keyframes({
  "0%": { transform: "translateY(0)" },
  "25%": { transform: "translateY(0.35rem)" },
  "60%": { transform: "translateY(-0.15rem)" },
  "100%": { transform: "translateY(0)" },
});

const arrowClick = keyframes({
  "0%": { transform: "translateY(0) rotate(0deg) scale(1)" },
  "18%": { transform: "translateY(0.75rem) rotate(-8deg) scale(0.98)" },
  "45%": { transform: "translateY(-0.25rem) rotate(3deg) scale(1.02)" },
  "75%": { transform: "translateY(0.12rem) rotate(-1deg) scale(1)" },
  "100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
});

export const enterOn = style({
  animation: `${enter} 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const tapPdf = style({
  animation: `${pdfTap} 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const tapArrow = style({
  animation: `${arrowClick} 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
