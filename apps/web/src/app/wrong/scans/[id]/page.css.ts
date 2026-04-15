import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";
import { bgColor, color } from "@/shared/styles/color.css";

export const page = style([
  bgColor["grayscale-0"],
  {
    minHeight: "100dvh",
    paddingBottom: "10rem",
  },
]);

export const header = style([
  bgColor["grayscale-0"],
  {
    position: "sticky",
    top: 0,
    zIndex: vars.zIndex.header,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.2rem 1.6rem",
  },
]);

export const headerSide = style({
  minWidth: "6.5rem",
});

export const body = style({
  padding: "2rem 1.6rem",
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
  width: "100%",
});

export const metaRow = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
});

export const titleRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1.2rem",
});

export const chipRow = style({
  display: "flex",
  gap: "0.8rem",
  alignItems: "center",
  flexWrap: "wrap",
});

export const chip = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
  },
  variants: {
    kind: {
      subject: [
        typo.caption.semibold,
        bgColor["main-500"],
        color["grayscale-0"],
        {
          padding: "0.4rem 1.2rem",
          borderRadius: vars.radius.full,
          cursor: "default",
        },
      ],
      type: [
        typo.caption.semibold,
        bgColor["grayscale-50"],
        color["grayscale-700"],
        {
          padding: "0.4rem 1.2rem",
          borderRadius: vars.radius.r8,
          cursor: "default",
        },
      ],
      button: [
        typo.body3.medium,
        {
          border: "none",
          borderRadius: vars.radius.r12,
          padding: "0.8rem 1.6rem",
        },
      ],
      add: [
        typo.body3.medium,
        {
          border: `1px solid ${vars.color.grayscale[100]}`,
          borderRadius: vars.radius.r12,
          padding: "0.8rem 1.6rem",
          background: vars.color.grayscale[0],
          color: vars.color.grayscale[400],
          gap: "0.8rem",
        },
      ],
      custom: [
        typo.body3.medium,
        {
          border: "none",
          borderRadius: vars.radius.r12,
          padding: "0.8rem 1.6rem",
          gap: "0.8rem",
        },
      ],
    },
    tone: {
      default: {},
      selected: {},
    },
  },
  compoundVariants: [
    {
      variants: { kind: "button", tone: "default" },
      style: {
        background: vars.color.grayscale[50],
        color: vars.color.grayscale[700],
        fontWeight: vars.typography.body3.fontWeight.medium,
      },
    },
    {
      variants: { kind: "button", tone: "selected" },
      style: {
        background: vars.color.main[100],
        color: vars.color.main[500],
        fontWeight: vars.typography.body3.fontWeight.semibold,
      },
    },
    {
      variants: { kind: "custom", tone: "default" },
      style: {
        background: vars.color.grayscale[50],
        color: vars.color.grayscale[700],
      },
    },
  ],
  defaultVariants: {
    tone: "default",
  },
});

export const heroTitle = style([typo.body1.bold, color["grayscale-900"]]);

export const editButton = style([
  typo.body3.medium,
  color["grayscale-300"],
  {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    cursor: "pointer",
  },
]);

export const imageWrap = style({
  width: "100%",
  borderRadius: vars.radius.r12,
  overflow: "hidden",
  border: `1px solid ${vars.color.grayscale[100]}`,
});

export const image = style({
  display: "block",
  width: "100%",
  height: "auto",
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
  color["grayscale-700"],
]);

export const bottomNav = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 1.6rem",
});

export const navButton = style([
  typo.body2.medium,
  color["grayscale-500"],
  {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
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
  padding: "0 1.6rem 2.8rem",
  boxSizing: "border-box",
  zIndex: vars.zIndex.bottomSheetOverlay,
});

export const sheet = style([
  bgColor["grayscale-0"],
  {
    width: "min(100%, 39rem)",
    maxWidth: "39rem",
    height: "54rem",
    borderRadius: vars.radius.r24,
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
  },
]);

export const sheetHeader = style([
  bgColor["grayscale-0"],
  color["grayscale-900"],
  typo.body1.bold,
  {
    padding: "2rem 1.6rem",
  },
]);

export const sheetBody = style({
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "0 1.6rem",
});

export const sheetSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const sheetSectionTitle = style([
  typo.body2.semibold,
  color["grayscale-800"],
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
