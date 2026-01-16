export const MATH_SUBJECT_LABELS = [
  "공통수학1",
  "공통수학2",
  "대수",
  "미적분I",
  "확률과 통계",
  "미적분II",
  "기하",
] as const;

export type MathSubjectLabel = (typeof MATH_SUBJECT_LABELS)[number];

export const MATH_SUBJECT_TYPE_LABELS = {
  공통수학1: ["다항식", "방정식과 부등식", "경우의 수", "행렬"],
  공통수학2: ["도형의 방정식", "집합과 명제", "함수와 그래프"],
  대수: ["지수함수와 로그함수", "삼각함수", "수열"],
  미적분I: ["함수의 극한과 연속", "미분", "적분"],
  "확률과 통계": ["경우의 수", "확률", "통계"],
  미적분II: ["수열의 극한", "미분법", "적분법"],
  기하: ["이차곡선", "공간도형과 공간좌표", "벡터"],
} as const satisfies Record<MathSubjectLabel, readonly string[]>;

export type MathSubjectTypeLabel =
  (typeof MATH_SUBJECT_TYPE_LABELS)[MathSubjectLabel][number];

export const WRONG_TYPE_LABELS = [
  "문장제",
  "시각 자료",
  "복합 개념",
  "특수 기호",
] as const;

export const TOGGLE_OPTIONS = [
  { value: "objective", label: "객관식" },
  { value: "subjective", label: "주관식" },
] as const;
