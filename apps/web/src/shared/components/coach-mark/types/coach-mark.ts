import type { IconProps } from "@/shared/components/icon/icon";
import { COACH_MARK_SEQUENCE } from "@/shared/components/coach-mark/constants/coach-mark";

export type CoachMarkStep = (typeof COACH_MARK_SEQUENCE)[number];

export type CoachMarkState = CoachMarkStep | null;

export type CoachMarkFeature = {
  id: string;
  iconName: IconProps["name"];
  title: string;
  description: string;
};
