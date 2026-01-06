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
  padding: "2.0rem 2.0rem 1.6rem",
  gap: "0.8rem",
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
});

export const titleRow = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: 0,
  gap: "0.4rem",
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    margin: "0 auto",
    width: "100%",
    height: "2.7rem",
    flex: "none",
    flexGrow: 1,
  },
]);

export const description = style([
  typo.body2.medium,
  color["grayscale-500"],
  {
    width: "100%",
    height: "2.4rem",
    display: "flex",
    alignItems: "center",
    flex: "none",
    alignSelf: "stretch",
  },
]);

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 2.0rem 2.0rem",
  gap: "1.6rem",
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
  alignSelf: "stretch",
});

export const buttonWrapper = style({
  flex: 1,
  minWidth: 0,
});

