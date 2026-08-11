import type { IconProps } from "@/shared/components/icon/icon";
import { COACH_MARK_SEQUENCE } from "@/shared/components/coach-mark/constants/coach-mark";

/** 코치마크 단계. 온보딩 직후 홈에서 시작해 문제 등록 플로우까지 순서대로 이어진다. */
export type CoachMarkStep = (typeof COACH_MARK_SEQUENCE)[number];

/** 코치마크가 꺼져 있으면 null */
export type CoachMarkState = CoachMarkStep | null;

export type CoachMarkFeature = {
  id: string;
  iconName: IconProps["name"];
  title: string;
  description: string;
};
