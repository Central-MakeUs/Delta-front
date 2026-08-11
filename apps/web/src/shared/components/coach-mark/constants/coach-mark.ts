import type { CoachMarkFeature } from "@/shared/components/coach-mark/types/coach-mark";

export const COACH_MARK_STORAGE_KEY = "app:coach-mark-step" as const;

export const COACH_MARK_STEPS = {
  WELCOME: "welcome",
  REGISTER_NUDGE: "register-nudge",
  PRACTICE: "practice",
  GRAPH_NUDGE: "graph-nudge",
  HOME_NUDGE: "home-nudge",
} as const;

export const COACH_MARK_SEQUENCE = [
  COACH_MARK_STEPS.WELCOME,
  COACH_MARK_STEPS.REGISTER_NUDGE,
  COACH_MARK_STEPS.PRACTICE,
  COACH_MARK_STEPS.GRAPH_NUDGE,
  COACH_MARK_STEPS.HOME_NUDGE,
] as const;

export const COACH_MARK_WELCOME = {
  ARIA_LABEL: "세모 사용 안내",
  TITLE: "세모에 오신 걸 환영해요 👋",
  DESCRIPTION: "지긋지긋한 오답정리, 이제 간단하게 끝내요.",
  CTA_LABEL: "문제 등록하러 가기",
} as const;

export const COACH_MARK_REGISTER_NUDGE = {
  ARIA_LABEL: "문제 등록 안내",
  TOOLTIP: "문제를 등록하러 가볼까요?",
} as const;

export const COACH_MARK_PRACTICE = {
  ARIA_LABEL: "연습 문제 안내",
  TITLE: "연습 문제로 시작해볼까요?",
  DESCRIPTION: "연습용 10문제로 세모를 시작해봐요!",
  CTA_LABEL: "직접 등록해보기",
} as const;

export const COACH_MARK_PRACTICE_SAMPLE = {
  PREVIEW_CARD_IDS: [
    "practice-preview-1",
    "practice-preview-2",
    "practice-preview-3",
    "practice-preview-4",
    "practice-preview-5",
    "practice-preview-6",
  ],
  TITLE: "공통수학1 문제",
  TAG: "공통수학1",
  CHIPS: ["다항식", "절댓값"],
} as const;

export const COACH_MARK_GRAPH_NUDGE = {
  TOOLTIP: "이제 그래프로 한눈에 파악해 볼까요?",
} as const;

export const COACH_MARK_HOME_NUDGE = {
  TOOLTIP: "이제 홈으로 이동해 직접 문제를 등록해 볼까요?",
} as const;

export const COACH_MARK_WELCOME_FEATURES: readonly CoachMarkFeature[] = [
  {
    id: "register",
    iconName: "graphic-note-pencil",
    title: "사진 한 장으로 등록 끝",
    description: "사진만 찍으면 문제가 자동으로 등록돼요",
  },
  {
    id: "collect",
    iconName: "graphic-check",
    title: "오답을 한 눈에",
    description: "틀린 문제만 모아서 다시 볼 수 있어요",
  },
  {
    id: "graph",
    iconName: "graphic-chart",
    title: "약한 단원이 그래프로!",
    description: "어떤 단원이 약한지 한눈에 확인해요",
  },
] as const;
