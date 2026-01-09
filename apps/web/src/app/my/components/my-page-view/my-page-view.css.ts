import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

export const page = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const content = style({
  flex: 1,
  marginTop: "-2.0rem",
  padding: "2.0rem 1.6rem",
  borderTopLeftRadius: vars.radius.r20,
  borderTopRightRadius: vars.radius.r20,
});

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const linkedAccountRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.2rem",
});

export const linkedAccountLabel = style([
  typo.body3.medium,
  color["grayscale-900"],
]);

export const linkedAccountValue = style({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
});

export const kakaoIcon = style({
  width: "2.0rem",
  height: "2.0rem",
});

export const emailText = style([typo.caption.regular, color["grayscale-500"]]);

export const menuList = style({
  display: "flex",
  flexDirection: "column",
});

export const divider = style({
  height: "0.1rem",
  width: "100%",
  backgroundColor: vars.color.border,
});
