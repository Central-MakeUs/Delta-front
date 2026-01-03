import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color, bgColor } from "@/shared/styles/color.css";

export const button = recipe({
  base: [
    typo.button1,
    color["main-500"], // Main 500 텍스트 색상 적용 예시
    bgColor["main-500"], // Main 500 배경색 적용 예시
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
