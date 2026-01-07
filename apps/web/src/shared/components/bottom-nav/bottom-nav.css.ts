import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const root = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    maxWidth: "43rem",
    margin: "0 auto",
    width: "100%",
    borderTop: `0.1rem solid ${vars.color.grayscale[50]}`,
    paddingLeft: "2.4rem",
    paddingRight: "2.4rem",
    paddingTop: "0.9rem",
    paddingBottom: `calc(0.9rem + env(safe-area-inset-bottom))`,
  },
]);

export const container = style({
  width: "100%",
  maxWidth: "37.5rem",
  margin: "0 auto",
});

export const list = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8.4rem",
});

export const item = style({
  width: "5.2rem",
  height: "4.6rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

export const iconWrap = style({
  width: "2.4rem",
  height: "2.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const iconActive = style([color["grayscale-900"]]);
export const iconInactive = style([color["grayscale-400"]]);

export const label = style([
  typo.caption.medium,
  {
    whiteSpace: "nowrap",
  },
]);

export const spacer = style({
  height: "6.4rem",
});

export const labelActive = style([color["grayscale-900"]]);
export const labelInactive = style([color["grayscale-400"]]);
