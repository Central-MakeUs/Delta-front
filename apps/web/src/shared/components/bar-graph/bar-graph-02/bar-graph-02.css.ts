import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";

export const barHeightVar = createVar(); // "12.0rem" 등

export const bar = recipe({
  base: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1.0rem", // 10px
    padding: "1.2rem 1.4rem", // 12px 14px
    height: barHeightVar,
    borderTopLeftRadius: vars.radius.r16,
    borderTopRightRadius: vars.radius.r16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  variants: {
    tone: {
      active: { backgroundColor: vars.color.grayscale[900] }, // #30323D
      inactive: { backgroundColor: vars.color.grayscale[100] }, // 필요 시
    },
  },
  defaultVariants: {
    tone: "active",
  },
});

export const chip = style({
  padding: "0.4rem 0.8rem", // 4px 8px
  backgroundColor: vars.color.grayscale[0],
  borderRadius: vars.radius.r24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const chipText = style({
  fontSize: "1.2rem", // 12px
  fontWeight: 600,
  lineHeight: "1.8rem",
  color: vars.color.grayscale[900],
});
