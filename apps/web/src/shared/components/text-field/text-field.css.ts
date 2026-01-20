import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const container = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      border: `0.1rem solid ${vars.color.grayscale[100]}`,
      borderRadius: vars.radius.r12,
      padding: "1.6rem",
      flex: 1,
      transition: "all 0.2s",
      selectors: {
        "&:focus-within": { borderColor: vars.color.grayscale[400] },
      },
    },
  ],
  variants: {
    fullWidth: {
      true: { width: "100%" },
      false: { width: "auto" },
    },
  },
});

export const textareaWrapper = recipe({
  base: [
    bgColor["grayscale-0"],
    {
      display: "flex",
      flexDirection: "column",
      gap: "0.8rem",
    },
  ],
  variants: {
    variant: {
      default: {},
      plain: {
        border: "none",
        padding: 0,
        backgroundColor: "transparent",
        minHeight: "auto",
      },
    },
    direction: {
      row: { flexDirection: "row", alignItems: "center" },
      column: { flexDirection: "column" },
    },
    disabled: {
      true: {
        backgroundColor: vars.color.grayscale[100],
        borderColor: vars.color.grayscale[200],
        opacity: 0.6,
      },
    },
    size: {
      lg: { minHeight: "17.6rem" },
      md: { minHeight: "1.6rem" },
    },
  },
  defaultVariants: {
    variant: "default",
    direction: "row",
    size: "md",
  },
});

export const prefix = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flex: "none",
  },
  variants: {
    position: {
      left: { order: 0 },
      right: { order: 2, marginLeft: "auto" },
    },
  },
});

export const textarea = recipe({
  base: [
    color["grayscale-700"],
    typo.body2.regular,
    {
      outline: "none",
      flex: 1,
      width: "100%",
      border: "none",
      background: "transparent",
      resize: "none",
      fontFamily: "inherit",
    },
  ],
  variants: {
    variant: {
      default: {},
      plain: {
        height: "2.4rem",
        minHeight: "2.4rem",
        maxHeight: "2.4rem",
        padding: 0,
      },
    },
    fontSize: {
      body1: typo.body1.medium,
      body2: typo.body2.medium,
      body3: typo.body3.medium,
    },
    // 아이콘이 오른쪽에 있을 때 텍스트를 앞으로 보냄
    order: {
      first: { order: 1 },
      second: { order: 2 },
    },
  },
});
