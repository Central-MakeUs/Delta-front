import { recipe } from "@vanilla-extract/recipes";

export const tabBar = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
});
