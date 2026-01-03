import { typo } from "@/shared/styles/typography.css";

export const TYPOGRAPHY_KEYS = [
  "h1",
  "h2",
  "h3",
  "subtitle-bold",
  "subtitle-semibold",
  "body1-bold",
  "body1-semibold",
  "body1-medium",
  "body1-regular",
  "body2-bold",
  "body2-semibold",
  "body2-medium",
  "body2-regular",
  "body3-bold",
  "body3-semibold",
  "body3-medium",
  "body3-regular",
  "button1",
  "button2",
  "caption-semibold",
  "caption-medium",
  "caption-regular",
] as const;

export type TypographyKey = (typeof TYPOGRAPHY_KEYS)[number];

export const TYPOGRAPHY_CLASS_MAP: Record<TypographyKey, string> = {
  h1: typo.h1,
  h2: typo.h2,
  h3: typo.h3,

  "subtitle-bold": typo.subtitle.bold,
  "subtitle-semibold": typo.subtitle.semibold,

  "body1-bold": typo.body1.bold,
  "body1-semibold": typo.body1.semibold,
  "body1-medium": typo.body1.medium,
  "body1-regular": typo.body1.regular,

  "body2-bold": typo.body2.bold,
  "body2-semibold": typo.body2.semibold,
  "body2-medium": typo.body2.medium,
  "body2-regular": typo.body2.regular,

  "body3-bold": typo.body3.bold,
  "body3-semibold": typo.body3.semibold,
  "body3-medium": typo.body3.medium,
  "body3-regular": typo.body3.regular,

  button1: typo.button1,
  button2: typo.button2,

  "caption-semibold": typo.caption.semibold,
  "caption-medium": typo.caption.medium,
  "caption-regular": typo.caption.regular,
};
