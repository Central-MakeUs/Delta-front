import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";

export const barHeightVar = createVar();

const BAR_PX = "clamp(0.8rem, 2vw, 1.4rem)";
const CHIP_PX = "clamp(0.6rem, 1.5vw, 0.8rem)";
const CHIP_FONT = "clamp(1.0rem, 2.2vw, 1.2rem)";

export const bar = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: `1.2rem ${BAR_PX}`,
    height: barHeightVar,
    borderTopLeftRadius: vars.radius.r16,
    borderTopRightRadius: vars.radius.r16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "visible",
  },
  variants: {
    tone: {
      active: { backgroundColor: vars.color.grayscale[900] },
      inactive: { backgroundColor: vars.color.grayscale[100] },
    },
  },
  defaultVariants: {
    tone: "active",
  },
});

export const topStack = style({
  width: "100%",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
});

export const crown = style({
  width: "1.6rem",
  height: "1.6rem",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const chip = style({
  padding: `0.4rem ${CHIP_PX}`,
  backgroundColor: vars.color.grayscale[0],
  borderRadius: vars.radius.r24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "max-content",
});

export const chipText = style({
  fontSize: CHIP_FONT,
  fontWeight: 600,
  lineHeight: "1.8rem",
  color: vars.color.grayscale[900],
  whiteSpace: "nowrap",
});
