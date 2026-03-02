import { style } from "@vanilla-extract/css";
import { bgColor } from "@/shared/styles/color.css";
import { sprinkles } from "@/shared/styles/sprinkles.css";
import { vars } from "@/shared/styles/theme.css";

export const root = style([
  bgColor["main-50"],
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: 2,
    py: 3,
    px: 4,
  }),
  {
    width: "100%",
    borderRadius: vars.radius.r12,
  },
]);

export const top = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: 3,
  }),
]);
