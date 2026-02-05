import { style } from "@vanilla-extract/css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const root = style([
  typo.caption.medium,
  color["grayscale-500"],
  {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
]);

export const text = style({
  whiteSpace: "nowrap",
});

export const icon = style([color["grayscale-500"], { flexShrink: 0 }]);
