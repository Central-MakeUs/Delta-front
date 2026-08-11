import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

/** 연습 문제 화면은 상단부터 꽉 차게 쓰므로 오버레이 기본 여백을 줄인다. */
export const body = style({
  selectors: {
    "&&": {
      padding: "0.8rem 1.6rem 0",
      alignItems: "stretch",
    },
  },
});

export const banner = style([
  bgColor["main-50"],
  {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    padding: "1.6rem",
    borderRadius: vars.radius.r12,
  },
]);

export const bannerTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const bannerTitle = style([
  typo.body2.bold,
  color["main-500"],
  { margin: 0 },
]);

export const bannerDescription = style([
  typo.body3.medium,
  color["grayscale-800"],
  { margin: 0 },
]);

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.2rem",
  marginTop: "2rem",
  paddingBottom: "2rem",
});

/** 하단 CTA 위로 카드가 자연스럽게 사라지는 페이드 */
export const footer = style({
  position: "relative",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "100%",
      height: "8rem",
      background: `linear-gradient(180deg, transparent 0%, ${vars.color.grayscale[0]} 100%)`,
      pointerEvents: "none",
    },
  },
});
