import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";

const LABEL_WIDTH_REM = 9.4;
const GAP_REM = 1.2;
const DASH_REM = 0.4;
const DASH_GAP_REM = 0.4;
const SEPARATOR_GAP_REM = 0.8; // 그래프 ↔ 선 간격
const ROW_GAP_REM = 1.6; // 그래프 ↔ 그래프 간 전체 간격

export const page = style({
  minHeight: "100dvh",
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

export const titleSection = style({});

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
