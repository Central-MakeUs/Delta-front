import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const typo = {
  h1: style({
    fontSize: vars.typography.h1.fontSize,
    fontWeight: vars.typography.h1.fontWeight,
    letterSpacing: vars.typography.h1.letterSpacing,
    lineHeight: vars.typography.h1.lineHeight,
  }),
  h2: style({
    fontSize: vars.typography.h2.fontSize,
    fontWeight: vars.typography.h2.fontWeight,
    letterSpacing: vars.typography.h2.letterSpacing,
    lineHeight: vars.typography.h2.lineHeight,
  }),
  h3: style({
    fontSize: vars.typography.h3.fontSize,
    fontWeight: vars.typography.h3.fontWeight,
    letterSpacing: vars.typography.h3.letterSpacing,
    lineHeight: vars.typography.h3.lineHeight,
  }),
  subtitle: {
    bold: style({
      fontSize: vars.typography.subtitle.fontSize,
      fontWeight: vars.typography.subtitle.fontWeight.bold,
      letterSpacing: vars.typography.subtitle.letterSpacing,
      lineHeight: vars.typography.subtitle.lineHeight,
    }),
    semibold: style({
      fontSize: vars.typography.subtitle.fontSize,
      fontWeight: vars.typography.subtitle.fontWeight.semibold,
      letterSpacing: vars.typography.subtitle.letterSpacing,
      lineHeight: vars.typography.subtitle.lineHeight,
    }),
  },
  body1: {
    bold: style({
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight.bold,
      letterSpacing: vars.typography.body1.letterSpacing,
      lineHeight: vars.typography.body1.lineHeight,
    }),
    semibold: style({
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight.semibold,
      letterSpacing: vars.typography.body1.letterSpacing,
      lineHeight: vars.typography.body1.lineHeight,
    }),
    medium: style({
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight.medium,
      letterSpacing: vars.typography.body1.letterSpacing,
      lineHeight: vars.typography.body1.lineHeight,
    }),
    regular: style({
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight.regular,
      letterSpacing: vars.typography.body1.letterSpacing,
      lineHeight: vars.typography.body1.lineHeight,
    }),
  },
  body2: {
    bold: style({
      fontSize: vars.typography.body2.fontSize,
      fontWeight: vars.typography.body2.fontWeight.bold,
      letterSpacing: vars.typography.body2.letterSpacing,
      lineHeight: vars.typography.body2.lineHeight,
    }),
    semibold: style({
      fontSize: vars.typography.body2.fontSize,
      fontWeight: vars.typography.body2.fontWeight.semibold,
      letterSpacing: vars.typography.body2.letterSpacing,
      lineHeight: vars.typography.body2.lineHeight,
    }),
    medium: style({
      fontSize: vars.typography.body2.fontSize,
      fontWeight: vars.typography.body2.fontWeight.medium,
      letterSpacing: vars.typography.body2.letterSpacing,
      lineHeight: vars.typography.body2.lineHeight,
    }),
    regular: style({
      fontSize: vars.typography.body2.fontSize,
      fontWeight: vars.typography.body2.fontWeight.regular,
      letterSpacing: vars.typography.body2.letterSpacing,
      lineHeight: vars.typography.body2.lineHeight,
    }),
  },
  body3: {
    bold: style({
      fontSize: vars.typography.body3.fontSize,
      fontWeight: vars.typography.body3.fontWeight.bold,
      letterSpacing: vars.typography.body3.letterSpacing,
      lineHeight: vars.typography.body3.lineHeight,
    }),
    semibold: style({
      fontSize: vars.typography.body3.fontSize,
      fontWeight: vars.typography.body3.fontWeight.semibold,
      letterSpacing: vars.typography.body3.letterSpacing,
      lineHeight: vars.typography.body3.lineHeight,
    }),
    medium: style({
      fontSize: vars.typography.body3.fontSize,
      fontWeight: vars.typography.body3.fontWeight.medium,
      letterSpacing: vars.typography.body3.letterSpacing,
      lineHeight: vars.typography.body3.lineHeight,
    }),
    regular: style({
      fontSize: vars.typography.body3.fontSize,
      fontWeight: vars.typography.body3.fontWeight.regular,
      letterSpacing: vars.typography.body3.letterSpacing,
      lineHeight: vars.typography.body3.lineHeight,
    }),
  },
  button1: style({
    fontSize: vars.typography.button1.fontSize,
    fontWeight: vars.typography.button1.fontWeight,
    letterSpacing: vars.typography.button1.letterSpacing,
    lineHeight: vars.typography.button1.lineHeight,
  }),
  button2: style({
    fontSize: vars.typography.button2.fontSize,
    fontWeight: vars.typography.button2.fontWeight,
    letterSpacing: vars.typography.button2.letterSpacing,
    lineHeight: vars.typography.button2.lineHeight,
  }),
  caption: {
    bold: style({
      fontSize: vars.typography.caption.fontSize,
      fontWeight: vars.typography.caption.fontWeight.bold,
      letterSpacing: vars.typography.caption.letterSpacing,
      lineHeight: vars.typography.caption.lineHeight,
    }),
    semibold: style({
      fontSize: vars.typography.caption.fontSize,
      fontWeight: vars.typography.caption.fontWeight.semibold,
      letterSpacing: vars.typography.caption.letterSpacing,
      lineHeight: vars.typography.caption.lineHeight,
    }),
    medium: style({
      fontSize: vars.typography.caption.fontSize,
      fontWeight: vars.typography.caption.fontWeight.medium,
      letterSpacing: vars.typography.caption.letterSpacing,
      lineHeight: vars.typography.caption.lineHeight,
    }),
    regular: style({
      fontSize: vars.typography.caption.fontSize,
      fontWeight: vars.typography.caption.fontWeight.regular,
      letterSpacing: vars.typography.caption.letterSpacing,
      lineHeight: vars.typography.caption.lineHeight,
    }),
  },
  captionXs: style({
    fontSize: vars.typography.captionXs.fontSize,
    fontWeight: vars.typography.captionXs.fontWeight.semibold,
    letterSpacing: vars.typography.captionXs.letterSpacing,
    lineHeight: vars.typography.captionXs.lineHeight,
  }),
};
