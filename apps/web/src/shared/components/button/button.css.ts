import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const button = recipe({
  base: [
    typo.button1,
    color["main-500"],
    color["mainBg-500"],
    {
      border: "none",
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
