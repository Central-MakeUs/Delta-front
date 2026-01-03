import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const button = recipe({
  base: [
    typo.button1,
    {
      border: "none",
      backgroundColor: vars.color.main[500],
      color: "#fff",
      borderRadius: vars.radius.r12,
    },
  ],
  variants: {
    size: {
      sm: { padding: vars.space[3] },
      lg: { padding: vars.space[6] },
    },
  },
});
