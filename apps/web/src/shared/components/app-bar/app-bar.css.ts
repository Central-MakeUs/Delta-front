import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import {
  APP_BAR_HEIGHT,
  APP_BAR_PADDING_X,
  APP_BAR_SIDE_SLOT_WIDTH,
} from "@/shared/components/app-bar/utils/app-bar-config";

export const root = recipe({
  base: {
    width: "100%",
    height: APP_BAR_HEIGHT,
    display: "flex",
    alignItems: "center",
    paddingLeft: APP_BAR_PADDING_X,
    paddingRight: APP_BAR_PADDING_X,
    boxSizing: "border-box",
  },
  variants: {
    surface: {
      solid: [bgColor["grayscale-0"]],
      transparent: {
        background: "transparent",
        borderBottom: "none",
      },
    },
    variant: {
      basic: { justifyContent: "flex-start", gap: "1.2rem" },
      basicAction: { justifyContent: "space-between" },
      default: { justifyContent: "space-between" },
      progress: { justifyContent: "space-between" },
      title: { justifyContent: "flex-start" },
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

export const actionText = style([
  typo.body3.medium,
  color["grayscale-400"],
  { whiteSpace: "nowrap" },
]);

export const sideSlot = style({
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

export const skipText = style([
  typo.body3.medium,
  color["grayscale-300"],
  { whiteSpace: "nowrap" },
]);
