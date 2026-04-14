import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor } from "@/shared/styles/color.css";

export const page = style({
  minHeight: "100dvh",
  background: vars.color.grayscale[0],
  paddingBottom: "10rem",
});

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: vars.zIndex.header,
  background: vars.color.grayscale[0],
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.2rem 1.6rem",
});

export const headerSide = style({
  minWidth: "6.5rem",
});

export const iconButton = style({
  border: "none",
  background: "transparent",
  padding: 0,
  width: "2.4rem",
  height: "2.4rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const headerTitleWrap = style({
  position: "relative",
});

export const headerTitleButton = style([
  typo.body1.bold,
  {
    border: "none",
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    color: vars.color.grayscale[900],
    cursor: "pointer",
  },
]);

export const headerSkip = style([
  typo.body3.medium,
  {
    minWidth: "6.5rem",
    textAlign: "right",
    color: vars.color.grayscale[300],
  },
]);

export const dropdown = style({
  position: "absolute",
  top: "5.4rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "14rem",
  boxShadow: vars.shadow.e400,
  borderRadius: vars.radius.r16,
  background: vars.color.grayscale[0],
  overflow: "hidden",
});

export const dropdownItem = style([
  typo.body3.medium,
  {
    width: "100%",
    border: "none",
    background: vars.color.grayscale[0],
    padding: "1.2rem 1.6rem",
    color: vars.color.grayscale[700],
    textAlign: "center",
    cursor: "pointer",
  },
]);

export const dropdownItemActive = style({
  color: vars.color.main[500],
  fontWeight: vars.typography.body3.fontWeight.semibold,
});

export const body = style({
  padding: vars.space[4],
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const heroHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1.2rem",
});

export const heroMeta = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const chipRow = style({
  display: "flex",
  gap: "0.8rem",
  alignItems: "center",
  flexWrap: "wrap",
});

export const subjectChip = style([
  typo.caption.semibold,
  {
    padding: "0.4rem 1.2rem",
    borderRadius: vars.radius.full,
    background: vars.color.main[500],
    color: vars.color.grayscale[0],
  },
]);

export const typeChip = style([
  typo.caption.semibold,
  {
    padding: "0.4rem 1.2rem",
    borderRadius: vars.radius.r8,
    background: vars.color.grayscale[50],
    color: vars.color.grayscale[700],
  },
]);

export const heroTitle = style([
  typo.body1.bold,
  {
    color: vars.color.grayscale[900],
  },
]);

export const editButton = style([
  typo.body3.medium,
  {
    border: "none",
    background: "transparent",
    color: vars.color.grayscale[300],
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    cursor: "pointer",
  },
]);

export const imageWrap = style({
  position: "relative",
  width: "100%",
  minHeight: "23.9rem",
  borderRadius: vars.radius.r12,
  overflow: "hidden",
  border: `1px solid ${vars.color.grayscale[100]}`,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const sectionTitle = style([
  typo.body2.semibold,
  {
    color: vars.color.grayscale[700],
  },
]);

export const bottomNav = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 1.6rem",
});

export const navButton = style([
  typo.body2.medium,
  {
    border: "none",
    background: "transparent",
    padding: 0,
    color: vars.color.grayscale[500],
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
  },
]);

export const bottomAction = style([
  bgColor["grayscale-0"],
  {
    position: "fixed",
    maxWidth: "43rem",
    margin: "0 auto",
    width: "100%",
    bottom: 0,
    padding: "1.6rem",
  },
]);

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(17,17,17,0.4)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  zIndex: vars.zIndex.bottomSheetOverlay,
});

export const sheet = style({
  width: "min(100%, 39rem)",
  height: "54rem",
  background: vars.color.grayscale[0],
  borderTopLeftRadius: vars.radius.r24,
  borderTopRightRadius: vars.radius.r24,
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  overflow: "hidden",
});

export const sheetHeader = style([
  typo.body1.bold,
  {
    padding: "2rem 1.6rem",
    background: vars.color.grayscale[0],
    color: vars.color.grayscale[900],
  },
]);

export const sheetBody = style({
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "2rem 1.6rem",
});

export const sheetSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const sheetSectionTitle = style([
  typo.body2.semibold,
  {
    color: vars.color.grayscale[800],
  },
]);

export const chipGroup = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "1.2rem",
});

export const subjectUnitHeader = style([
  typo.body3.medium,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    color: vars.color.grayscale[700],
  },
]);

export const divider = style({
  height: "0.4rem",
  margin: "0 -1.6rem",
  background: vars.color.grayscale[50],
  flexShrink: 0,
});

export const chipButton = style([
  typo.body3.medium,
  {
    border: "none",
    borderRadius: vars.radius.r12,
    padding: "0.8rem 1.6rem",
    cursor: "pointer",
  },
]);

export const chipButtonTone = styleVariants({
  default: {
    background: vars.color.grayscale[50],
    color: vars.color.grayscale[700],
    fontWeight: vars.typography.body3.fontWeight.medium,
  },
  selected: {
    background: vars.color.main[100],
    color: vars.color.main[500],
    fontWeight: vars.typography.body3.fontWeight.semibold,
  },
});

export const addTypeChip = style([
  typo.body3.medium,
  {
    border: `1px solid ${vars.color.grayscale[100]}`,
    borderRadius: vars.radius.r12,
    padding: "0.8rem 1.6rem",
    background: vars.color.grayscale[0],
    color: vars.color.grayscale[400],
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
  },
]);

export const customTypeChip = style([
  typo.body3.medium,
  {
    border: "none",
    borderRadius: vars.radius.r12,
    padding: "0.8rem 1.6rem",
    background: vars.color.grayscale[50],
    color: vars.color.grayscale[700],
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
  },
]);

export const sheetFooter = style({
  padding: "2rem 1.6rem calc(2rem + env(safe-area-inset-bottom))",
  background: vars.color.grayscale[0],
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const closeButton = style([
  typo.body2.medium,
  {
    border: "none",
    background: "transparent",
    color: vars.color.grayscale[500],
    cursor: "pointer",
  },
]);
