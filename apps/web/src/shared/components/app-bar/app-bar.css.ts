import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";
import {
  APP_BAR_HEIGHT,
  APP_BAR_PADDING_X,
  APP_BAR_SIDE_SLOT_WIDTH,
} from "@/shared/components/app-bar/constants/app-bar";

export const fixedOnMy = style({
  selectors: {
    "&&": {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "43rem",
      zIndex: vars.zIndex.header,
      backgroundColor: "transparent",
      boxSizing: "border-box",
    },
  },
});

export const root = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      width: "100%",
      height: APP_BAR_HEIGHT,
      display: "flex",
      alignItems: "center",
      paddingLeft: APP_BAR_PADDING_X,
      paddingRight: APP_BAR_PADDING_X,
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      zIndex: vars.zIndex.header,
    },
  ],
  variants: {
    surface: {
      solid: {},
      transparent: {
        background: "transparent",
      },
    },
    variant: {
      basic: { justifyContent: "flex-start" },
      basicAction: { justifyContent: "space-between" },
      default: { justifyContent: "space-between" },
      progress: { justifyContent: "space-between" },
      title: { justifyContent: "flex-start" },
      graphTabs: {
        paddingInline: 0,
      },
    },
  },
  defaultVariants: {
    surface: "solid",
  },
});

export const buttonReset = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const leftGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "1.2rem",
  minWidth: 0,
});

export const title = style([
  typo.body1.semibold,
  color["grayscale-900"],
  {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const icon = style([color["grayscale-900"]]);

export const premiumIcon = style([color["main-500"]]);

export const premiumButton = style([
  buttonReset,
  color["main-500"],
  bgColor["main-50"],
  {
    padding: "0.4rem 0.8rem",
    borderRadius: vars.radius.r24,
    gap: "0.4rem",
    display: "flex",
    alignItems: "center",
  },
]);

export const premiumButtonText = style([
  typo.caption.semibold,
  color["main-500"],
]);

export const logo = style({
  width: "6.8rem",
  height: "2.4rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const rightIconButton = style([
  buttonReset,
  {
    width: "2.4rem",
    height: "2.4rem",
    flexShrink: 0,
  },
]);

export const rightButtonGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  marginLeft: "auto",
});

const sideSlot = style({
  width: APP_BAR_SIDE_SLOT_WIDTH,
  display: "flex",
  alignItems: "center",
});

export const leftSlot = style([sideSlot, { justifyContent: "flex-start" }]);
export const rightSlot = style([sideSlot, { justifyContent: "flex-end" }]);

export const centerSlot = style({
  flex: "1 1 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 0,
});

export const actionButton = style([
  buttonReset,
  typo.body3.medium,
  color["grayscale-400"],
  {
    padding: "0.4rem 0.8rem",
    whiteSpace: "nowrap",
  },
]);

export const stickyTop = style({
  position: "sticky",
  top: 0,
  zIndex: vars.zIndex.header,
  backgroundColor: vars.color.bg,
  width: "100%",
});
