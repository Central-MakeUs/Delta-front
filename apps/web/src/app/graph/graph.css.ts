import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";
import {
  LABEL_WIDTH_REM,
  GAP_REM,
  DASH_REM,
  DASH_GAP_REM,
  SEPARATOR_GAP_REM,
  ROW_GAP_REM,
} from "@/shared/components/bar-graph/bar-graph-horizontal/constants/bar-style";

export const page = style({
  backgroundColor: vars.color.bg,
});

export const stickyTop = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: vars.color.bg,
});

export const content = style({
  padding: "2rem 1.6rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const title = style([typo.subtitle.bold, color["grayscale-900"]]);

export const titleSection = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const grapWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const graphList = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: `${ROW_GAP_REM}rem`,
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: `${LABEL_WIDTH_REM + GAP_REM}rem`,
      width: "0.1rem",
      backgroundColor: vars.color.grayscale[100],
    },
  },
});

export const graphRow = style({
  position: "relative",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: `${LABEL_WIDTH_REM}rem`,
      width: `${GAP_REM}rem`,
      height: "0.1rem",
      backgroundColor: vars.color.grayscale[100],
    },

    "&:not(:last-child)::after": {
      content: '""',
      position: "absolute",
      bottom: `-${SEPARATOR_GAP_REM}rem`,
      left: `${LABEL_WIDTH_REM + GAP_REM}rem`,
      right: 0,
      height: "0.1rem",
      zIndex: 0,
      backgroundImage: `repeating-linear-gradient(
        to right,
        ${vars.color.grayscale[50]} 0,
        ${vars.color.grayscale[50]} ${DASH_REM}rem,
        transparent ${DASH_REM}rem,
        transparent ${DASH_REM + DASH_GAP_REM}rem
      )`,
    },
  },
});

export const graphRowInner = style({
  position: "relative",
  zIndex: 1,
});
