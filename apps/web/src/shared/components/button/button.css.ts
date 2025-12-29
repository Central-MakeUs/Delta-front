import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";

export const button = recipe({
  base: {
    border: "none",
    backgroundColor: vars.color.brand,
    color: "#fff",
    fontWeight: 700,
    borderRadius: vars.radius.md,
  },
  variants: {
    size: {
      sm: { padding: vars.space[3] },
      lg: { padding: vars.space[6] },
    },
  },
});
