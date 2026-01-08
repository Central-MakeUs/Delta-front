import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 0,
      position: "relative",
      width: "32.4rem",
      borderRadius: vars.radius.r16,
      boxShadow: vars.shadow.e300,
      zIndex: 1001,
    },
  ],
  variants: {
    size: {
      sm: {
        width: "28rem",
      },
      md: {
        width: "32.4rem",
      },
      lg: {
        width: "40rem",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "2.0rem",
  width: "100%",
});

export const contentContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "0.8rem",
});

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const icon = style({
  display: "block",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "0.4rem",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    width: "100%",
    textAlign: "center",
  },
]);

export const description = style([
  typo.body3.medium,
  color["grayscale-500"],
  {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
]);

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 2rem 2rem",
  width: "100%",
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "1.2rem",
  width: "100%",
});

export const buttonWrapper = style({
  flex: 1,
  minWidth: 0,
});

