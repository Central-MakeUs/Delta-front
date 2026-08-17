import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

const CIRCLE_SIZE = "4.2rem";
const CIRCLE_RADIUS = "2.1rem";

export const list = style({
  width: "100%",
  maxWidth: "31rem",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const item = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",
  padding: "1.2rem 0",

  selectors: {
    "&:not(:last-child)::after": {
      content: '""',
      position: "absolute",
      left: CIRCLE_RADIUS,
      top: `calc(50% + ${CIRCLE_RADIUS})`,
      bottom: `calc(${CIRCLE_RADIUS} - 50%)`,
      transform: "translateX(-50%)",
      borderLeft: `1px dashed ${vars.color.main[100]}`,
    },
  },
});

export const iconCircle = style([
  bgColor["main-50"],
  color["main-500"],
  {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    flexShrink: 0,
    borderRadius: vars.radius.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  minWidth: 0,
});

export const title = style([
  typo.body2.bold,
  color["grayscale-900"],
  { margin: 0 },
]);

export const description = style([
  typo.body3.medium,
  color["grayscale-700"],
  { margin: 0 },
]);
