import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: vars.color.grayscale[0],
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "2rem 1.6rem",
  gap: "1rem",
  width: "100%",
  flex: "1 1 0%",
  paddingBottom: "10.1rem", // 하단 버튼 공간 확보
});

export const mainContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "2rem",
  width: "100%",
  flex: "none",
});

export const headerSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "0.8rem",
  width: "100%",
  flex: "none",
});

export const headerTop = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
  flex: "none",
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    display: "flex",
    order: 0,
    flexGrow: 0,
  },
]);

export const headerChips = style({
  display: "flex",
  gap: "1.2rem",
});

export const imageContainer = style({
  boxSizing: "border-box",
  width: "100%",
  height: "23.8rem",
  background: vars.color.grayscale[50],
  border: `0.1rem solid ${vars.color.grayscale[200]}`,
  borderRadius: "1.2rem",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const inputSection = style([
  bgColor["grayscale-50"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.2rem",
    gap: "1rem",
    width: "100%",
    borderRadius: "1.6rem",
    flex: "none",
    order: 1,
    alignSelf: "stretch",
    flexGrow: 0,
  },
]);

export const inputContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "1.2rem",
  width: "100%",
  flex: "none",
});

export const answerButtonWrapper = style({
  position: "relative",
  width: "100%",
  height: "5rem",
  flex: "none",
  order: 0,
  flexGrow: 0,
  borderRadius: "1.2rem",
  overflow: "hidden",
});

export const answerButtonOverlay = style({
  position: "absolute",
  width: "100%",
  height: "5rem",
  left: 0,
  top: 0,
  background: "rgba(214, 214, 214, 0.1)",
  backdropFilter: "blur(0.6rem)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "1.3rem 7.3rem",
  gap: "1rem",
  zIndex: 1,
});

export const answerButtonContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "0.8rem",
  flex: "none",
  order: 0,
  flexGrow: 0,
});

export const answerChipWrapper = style([
  bgColor["grayscale-0"],
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1.2rem",
    gap: "0.8rem",
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const answerNumber = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const answerButtonText = style([
  typo.body3.semibold,
  color["main-500"],
  {
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const solutionInputWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.8rem",
  width: "100%",
  height: "27rem",
  flex: 1,
  flexGrow: 1,
  minHeight: 0,
});

export const bottomButtonContainer = style({
  position: "fixed",
  width: "100%",
  height: "10.1rem",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  background: vars.color.grayscale[0],
  zIndex: 100,
});

export const bottomButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.6rem",
  gap: "1.2rem",
  width: "100%",
  height: "8rem",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const bottomButton = style([
  bgColor["main-500"],
  color["grayscale-0"],
  typo.body2.semibold,
  {
    width: "100%",
    height: "4.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    flex: "none",
    borderRadius: "1.2rem",
    border: "none",
    cursor: "pointer",
  },
]);
