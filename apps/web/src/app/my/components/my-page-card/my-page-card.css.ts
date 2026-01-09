import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const card = style({
  width: "100%",
  padding: "1.2rem",
  borderRadius: vars.radius.r12,
});
