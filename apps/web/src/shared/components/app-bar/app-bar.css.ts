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

      "@supports": {
        "(padding-top: env(safe-area-inset-top))": {
          paddingTop: "env(safe-area-inset-top)",
          height: `calc(${APP_BAR_HEIGHT} + env(safe-area-inset-top))`,
        },
      },
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
      scanDetail: { justifyContent: "space-between" },
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

export const actionIconButton = style([
  color["grayscale-900"],
  buttonReset,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);

export const centerTitleWrap = style({
  position: "relative",
  flex: "1 1 0",
  display: "flex",
  justifyContent: "center",
  minWidth: 0,
});

export const centerTitleButton = style([
  buttonReset,
  typo.body1.bold,
  color["grayscale-900"],
  {
    gap: "0.8rem",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const titleText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const titleDropdown = style([
  bgColor["grayscale-0"],
  {
    position: "absolute",
    top: "calc(100% + 1.2rem)",
    left: "50%",
    transform: "translateX(-50%)",
    width: "14rem",
    borderRadius: vars.radius.r16,
    boxShadow: vars.shadow.e400,
    overflow: "hidden",
    zIndex: vars.zIndex.contentOverlayHigh,
  },
]);

export const titleDropdownItem = style([
  buttonReset,
  typo.body3.medium,
  color["grayscale-700"],
  {
    width: "100%",
    padding: "1.2rem 1.6rem",
    justifyContent: "flex-start",
    textAlign: "left",
  },
]);

export const titleDropdownItemText = style({
  display: "block",
  width: "100%",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const titleDropdownItemActive = style([
  typo.body3.semibold,
  color["main-500"],
]);

export const titleDropdownItemTextInactive = style([
  typo.body3.medium,
  color["grayscale-700"],
]);

export const titleDropdownItemTextActive = style([
  typo.body3.semibold,
  color["main-500"],
]);

export const rightLabelButton = style([
  buttonReset,
  typo.body3.medium,
  color["grayscale-300"],
  {
    minWidth: APP_BAR_SIDE_SLOT_WIDTH,
    justifyContent: "flex-end",
    cursor: "default",
    selectors: {
      "&:disabled": {
        opacity: 1,
      },
    },
  },
]);

export const titleMenuIcon = style([color["main-400"]]);
