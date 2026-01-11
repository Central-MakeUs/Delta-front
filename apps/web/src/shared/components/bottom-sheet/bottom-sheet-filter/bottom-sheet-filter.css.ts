import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";
import { slideUp, slideDown, fadeIn, fadeOut } from "../styles/animations.css";

export const overlay = style([
  bgColor["overDim-40"],
  {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    animation: `${fadeIn} 0.3s ease-out`,
  },
]);

export const overlayClosing = style({
  animation: `${fadeOut} 0.3s ease-in`,
});

export const bottomSheet = style([
  bgColor["grayscale-0"],
  {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    borderRadius: "24px 24px 0 0",
    zIndex: 1001,
    overflow: "auto",
    animation: `${slideUp} 0.3s ease-out`,
  },
]);

export const bottomSheetClosing = style({
  animation: `${slideDown} 0.3s ease-in`,
});

export const frameContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 0,
  gap: "20px",
  width: "100%",
  position: "relative",
});

export const headerFrame = style([
  bgColor["grayscale-0"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px 16px",
    gap: "10px",
    width: "100%",
    flex: "none",
    alignSelf: "stretch",
    flexGrow: 0,
  },
]);

export const headerContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 0,
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
});

export const title = style([
  typo.body1.bold,
  color["grayscale-900"],
  {
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
]);

export const closeButton = style([
  color["grayscale-900"],
  {
    width: "24px",
    height: "24px",
    flex: "none",
    order: 1,
    flexGrow: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    padding: 0,
    color: vars.color.grayscale[900],
  },
]);

export const contentFrame = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  gap: "20px",
  width: "100%",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const sectionFrame = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 16px",
  gap: "16px",
  width: "100%",
  flex: "none",
  alignSelf: "stretch",
  flexGrow: 0,
});

export const sectionTitle = style([
  typo.body2.semibold,
  color["grayscale-800"],
  {
    width: "100%",
    height: "24px",
    flex: "none",
    order: 0,
    alignSelf: "stretch",
    flexGrow: 0,
  },
]);

export const chipContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  alignContent: "flex-start",
  padding: 0,
  gap: "12px",
  width: "100%",
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const chip = style([
  typo.body3.medium,
  bgColor["grayscale-50"],
  color["grayscale-700"],
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    gap: "8px",
    height: "37px",
    borderRadius: "12px",
    flex: "none",
    cursor: "pointer",
  },
]);

export const chipSelected = style([
  typo.body3.semibold,
  bgColor["main-100"],
  color["main-500"],
]);

export const chipText = style({
  textAlign: "center",
  flex: "none",
  order: 0,
  flexGrow: 0,
});

export const dropdownSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  width: "100%",
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const dropdownHeader = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "8px",
  width: "100%",
  flex: "none",
  order: 0,
  flexGrow: 0,
  cursor: "pointer",
});

export const triangleIcon = style({
  width: "16px",
  height: "16px",
  flex: "none",
  order: 0,
  flexGrow: 0,
  transform: "rotate(90deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.grayscale[700],
});

export const dropdownTitle = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const checkboxList = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "16px",
  width: "100%",
  flexWrap: "wrap",
});

export const checkboxItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,
  gap: "8px",
  flex: "none",
  cursor: "pointer",
});

export const checkbox = style([
  bgColor["grayscale-50"],
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    gap: "10px",
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    border: `1.33333px solid ${vars.color.grayscale[400]}`,
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
]);

export const checkboxChecked = style({
  backgroundColor: vars.color.grayscale[50],
  borderColor: vars.color.grayscale[400],
});

export const checkboxIcon = style({
  width: "16px",
  height: "16px",
  flex: "none",
  order: 0,
  flexGrow: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.grayscale[900],
});

export const checkboxLabel = style([
  typo.body3.medium,
  color["grayscale-700"],
  {
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
]);

export const divider = style([
  bgColor["grayscale-50"],
  {
    width: "100%",
    height: "0.4rem",
    flex: "none",
  },
]);

export const footerFrame = style([
  bgColor["grayscale-0"],
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px 16px",
    gap: "10px",
    width: "100%",
    position: "sticky",
    bottom: 0,
  },
]);

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: 0,
  gap: "10px",
  width: "100%",
  flex: "none",
  order: 0,
  alignSelf: "stretch",
  flexGrow: 0,
});

export const resetButtonOverride = style({
  width: "134px",
  minWidth: "134px",
  flexGrow: 0,
});

globalStyle(`${resetButtonOverride} svg`, {
  stroke: vars.color.grayscale[700],
});

export const applyButtonOverride = style({
  flex: "1 1 0%",
  flexGrow: 1,
});
