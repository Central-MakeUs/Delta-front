import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

export const tooltip = style([
  typo.caption.semibold,
  color["grayscale-50"],
  bgColor["grayscale-900"],
  {
    appearance: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.8rem 1.2rem",
    borderRadius: vars.radius.r12,
    boxShadow: vars.shadow.e400,
    whiteSpace: "nowrap",
  },
]);
