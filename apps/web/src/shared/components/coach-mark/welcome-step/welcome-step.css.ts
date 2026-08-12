import { style } from "@vanilla-extract/css";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

export const body = style({
  selectors: {
    "&&": {
      paddingTop: "0",
    },
  },
});

export const content = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "auto",
  paddingBlock: "1.6rem",
  boxSizing: "border-box",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
  textAlign: "center",
});

export const title = style([typo.h3, color["grayscale-900"], { margin: 0 }]);

export const description = style([
  typo.body1.medium,
  color["grayscale-700"],
  { margin: 0 },
]);
