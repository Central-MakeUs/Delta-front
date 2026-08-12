import { style } from "@vanilla-extract/css";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import { vars } from "@/shared/styles/theme.css";

export const card = style([
  bgColor["grayscale-50"],
  {
    position: "relative",
    aspectRatio: "174 / 174",
    borderRadius: `0 0 ${vars.radius.r12} ${vars.radius.r12}`,
  },
]);

export const cardLink = style({
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: `0 0 ${vars.radius.r12} ${vars.radius.r12}`,
  overflow: "hidden",
  cursor: "pointer",
});

export const deleteButton = style([
  bgColor["grayscale-0"],
  color["grayscale-900"],
  {
    position: "absolute",
    top: "0.8rem",
    left: "0.8rem",
    zIndex: vars.zIndex.contentOverlayHigh,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "3.2rem",
    height: "3.2rem",
    borderRadius: vars.radius.r8,
    boxShadow: "0 0.4rem 1.2rem rgba(0, 0, 0, 0.16)",
    cursor: "pointer",
  },
]);

export const cardFrame = style({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: `0 0 ${vars.radius.r12} ${vars.radius.r12}`,
  overflow: "hidden",
});

export const cardImage = style({
  objectFit: "cover",
});

export const cardOverlay = style({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(17, 17, 17, 1) 100%)",
  opacity: 0.6,
});

export const subjectChip = style([
  bgColor["main-500"],
  color["grayscale-0"],
  typo.caption.semibold,
  {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: vars.zIndex.contentOverlayHigh,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.4rem 1.2rem",
    borderRadius: `0 0 0 ${vars.radius.r8}`,
  },
]);

export const cardBody = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "1.2rem",
});

export const cardContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.8rem",
});

export const chipWrap = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.6rem",
  alignItems: "flex-start",
});

export const unitChip = style([
  color["grayscale-900"],
  bgColor["grayscale-50"],
]);

export const cardTitle = style([
  typo.body1.bold,
  color["grayscale-0"],
  {
    alignSelf: "stretch",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
]);
