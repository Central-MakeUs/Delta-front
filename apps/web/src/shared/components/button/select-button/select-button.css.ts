import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const selectButton = recipe({
  base: {
    padding: "1.6rem",
    borderRadius: vars.radius.r12,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    border: "none",
    cursor: "pointer",
  },

  variants: {
    active: {
      false: { background: vars.color.grayscale[50] },
      true: { background: vars.color.main[100] },
    },
    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
  },

  defaultVariants: {
    active: false,
    fullWidth: false,
  },
});

export const label = recipe({
  base: [typo.body2.medium, { wordWrap: "break-word" }],
  variants: {
    active: {
      false: [{ color: vars.color.grayscale[600] }],
      true: [typo.body2.semibold, { color: vars.color.main[500] }],
    },
  },
  defaultVariants: { active: false },
});
