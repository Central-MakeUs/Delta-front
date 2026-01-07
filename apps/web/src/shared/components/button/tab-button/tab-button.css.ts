import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

const activeState = style([
  typo.body3.semibold,
  bgColor["main-500"],
  color["grayscale-0"],
]);

const inactiveState = style([typo.body3.medium, color["grayscale-700"]]);

export const tabButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
    borderRadius: vars.radius.r12,
    padding: "0.8rem 1.2rem",
    transition:
      "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: `0 0 0 0.2rem ${vars.color.main[500]}`,
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    },
  },

  variants: {
    state: {
      active: activeState,
      inactive: inactiveState,
    },
  },

  defaultVariants: {
    state: "inactive",
  },
});
