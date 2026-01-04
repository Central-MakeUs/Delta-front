import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

const GAP = "0.6rem";
const TRACK_PAD = "0.2rem";

export const root = style({
  display: "flex",
  padding: TRACK_PAD,
  backgroundColor: vars.color.main[50],
  borderRadius: "17px",
  maxWidth: "11.2rem",
});

export const track = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: GAP,
  alignItems: "center",
});

export const indicator = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,

  width: `calc((100% - ${GAP}) / 2)`,
  borderRadius: "25px",
  backgroundColor: vars.color.main[400],

  transform: "translateX(0)",
  transition: "transform 160ms ease",

  selectors: {
    [`${track}[data-active="right"] &`]: {
      transform: `translateX(calc(100% + ${GAP}))`,
    },
  },
});

export const button = style({
  position: "relative",
  zIndex: 1,

  width: "6rem",
  height: "2.8rem",
  padding: "0.3rem 0.8rem",

  border: 0,
  background: "transparent",
  cursor: "pointer",
  borderRadius: "25px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: vars.typography.caption.fontSize,
  lineHeight: vars.typography.caption.lineHeight,
  letterSpacing: vars.typography.caption.letterSpacing,

  color: vars.color.main[200],
  fontWeight: vars.typography.caption.fontWeight.medium,

  selectors: {
    '&[data-state="on"]': {
      color: vars.color.grayscale[0],
      fontWeight: vars.typography.caption.fontWeight.semibold,
    },

    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
    },

    "&:focus-visible": {
      outline: `2px solid ${vars.color.main[400]}`,
      outlineOffset: "2px",
    },
  },
});
