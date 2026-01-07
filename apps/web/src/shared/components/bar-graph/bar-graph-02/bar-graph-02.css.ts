import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const barHeightVar = createVar();

const BAR_PX = "clamp(0.8rem, 2vw, 1.4rem)";

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

export const chip = style([
  bgColor["grayscale-0"],
  {
    padding: `0.4rem 0.8rem`,
    borderRadius: vars.radius.r24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "max-content",
  },
]);

export const chipText = style([
  typo.caption.semibold,
  color["grayscale-900"],
  {
    fontWeight: 600,
    lineHeight: "1.8rem",
    whiteSpace: "nowrap",
  },
]);
