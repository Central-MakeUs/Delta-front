import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const card = style([
  bgColor["grayscale-50"],
  {
    position: "relative",
    borderRadius: vars.radius.r16,
    padding: "2.0rem",
    display: "flex",
    gap: "1.6rem",
    alignItems: "stretch",
    overflow: "hidden",
  },
]);

export const side = styleVariants({
  left: { flexDirection: "row" },
  right: { flexDirection: "row-reverse" },
});

export const ribbon = style([
  color["grayscale-0"],
  {
    position: "absolute",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    padding: "0.8rem 1.6rem",
    width: "fit-content",
    background: `linear-gradient(270deg, ${vars.color.main[500]} 0%, ${vars.color.main[300]} 100%)`,
  },

  {
    selectors: {
      [`${card}.${side.left} &`]: {
        left: "0",
        right: "auto",
        borderTopLeftRadius: vars.radius.r16,
        borderBottomRightRadius: vars.radius.r16,
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "0px",
      },

      [`${card}.${side.right} &`]: {
        right: "0",
        left: "auto",
        borderTopRightRadius: vars.radius.r16,
        borderBottomLeftRadius: vars.radius.r16,
        borderTopLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      },
    },
  },
]);

export const crown = style({
  width: "2.0rem",
  height: "2.0rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ribbonText = style([
  typo.body3.semibold,
  color["grayscale-0"],
  { whiteSpace: "nowrap" },
]);

export const text = style({
  flex: 1,
  paddingTop: "3.6rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const head = style([
  typo.body1.semibold,
  color["grayscale-900"],
  {
    whiteSpace: "pre-line",
  },
]);

export const en = style([
  typo.body1.semibold,
  color["grayscale-900"],
  { display: "block" },
]);

export const desc = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    whiteSpace: "pre-line",
  },
]);

export const illu = style([
  bgColor["grayscale-0"],
  {
    width: "15.7rem",
    height: "20.8rem",
    borderRadius: vars.radius.r16,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);

export const revealBase = style({
  opacity: 0,
  transform: "translateY(1.2rem)",
  transition: "transform 600ms ease, opacity 600ms ease",
  willChange: "transform, opacity",
});

export const revealOn = style({
  opacity: 1,
  transform: "translateY(0)",
});
