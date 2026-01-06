import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";

export const progressBar = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
  },
});

export const segment = recipe({
  base: {
    height: "0.8rem",
    borderRadius: vars.radius.full,
    flexShrink: 0,
    border: "none",
    padding: 0,
    appearance: "none",
    background: "transparent",
    cursor: "pointer",
  },

  variants: {
    state: {
      active: {
        width: "2.4rem",
        backgroundColor: vars.color.grayscale[800],
      },
      inactive: {
        width: "0.8rem",
        backgroundColor: vars.color.grayscale[100],
      },
    },
  },

  defaultVariants: {
    state: "inactive",
  },
});
