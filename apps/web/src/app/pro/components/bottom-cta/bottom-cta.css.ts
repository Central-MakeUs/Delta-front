import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const wrap = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "0",
    width: "100%",
    maxWidth: "43rem",
    zIndex: vars.zIndex?.bottomButton,
    padding: "1.6rem",
  },
]);

export const button = style([
  typo.button1,
  color["grayscale-0"],
  bgColor["main-500"],
  {
    width: "100%",
    height: "4.8rem",
    borderRadius: vars.radius.r12,
    border: "0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);
