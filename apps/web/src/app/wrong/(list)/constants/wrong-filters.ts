import type {
  BottomSheetFilterProps,
  DropdownSection,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import type { SortOption } from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

export type ChapterFilterItem = NonNullable<
  BottomSheetFilterProps["chapterFilters"]
>[number];

export type TypeFilterItem = NonNullable<
  BottomSheetFilterProps["typeFilters"]
>[number];

export const SORT_OPTIONS: SortOption[] = [
  { id: "recent", label: "최근 등록순" },
  { id: "wrong-incomplete", label: "오답 전 문제" },
  { id: "wrong-complete", label: "오답 완료 문제" },
  { id: "type-desc", label: "최다 등록 유형순" },
  { id: "type-asc", label: "최소 등록 유형순" },
];

export const CHAPTER_FILTERS: ChapterFilterItem[] = [
  { id: "common-math-1", label: "공통수학1" },
  { id: "common-math-2", label: "공통수학2" },
  { id: "algebra", label: "대수" },
  { id: "calculus-1", label: "미적분I" },
  { id: "probability-statistics", label: "확률과 통계" },
  { id: "calculus-2", label: "미적분II" },
  { id: "geometry", label: "기하" },
];

export const TYPE_FILTERS: TypeFilterItem[] = [
  { id: "T_GRAPH_FIGURE", label: "그래프/도형" },
  { id: "common-math-2", label: "공통수학2" },
  { id: "algebra", label: "대수" },
  { id: "absolute-value", label: "절댓값" },
  { id: "equation", label: "방정식" },
];

export const CHAPTER_DROPDOWN_OPTIONS = {
  "common-math-1": [
    { id: "polynomial", label: "다항식" },
    { id: "equation-inequality", label: "방정식과 부등식" },
    { id: "permutation-combination", label: "경우의 수" },
    { id: "matrix", label: "행렬" },
  ],
  "common-math-2": [
    { id: "shapes", label: "도형의 방정식" },
    { id: "set-proposition", label: "집합과 명제" },
    { id: "function-graph", label: "함수와 그래프" },
  ],
  algebra: [
    { id: "exponent-log", label: "지수함수와 로그함수" },
    { id: "trigonometric", label: "삼각함수" },
    { id: "sequence", label: "수열" },
  ],
  "calculus-1": [
    { id: "limit-continuity", label: "함수의 극한과 연속" },
    { id: "differentiation", label: "미분" },
    { id: "integration", label: "적분" },
  ],
  "probability-statistics": [
    { id: "counting", label: "순열과 조합" },
    { id: "probability", label: "확률" },
    { id: "statistics", label: "통계" },
  ],
  "calculus-2": [
    { id: "sequence-limit", label: "수열의 극한" },
    { id: "differentiation-method", label: "미분법" },
    { id: "integration-method", label: "적분법" },
  ],
  geometry: [
    { id: "conic-section", label: "이차곡선" },
    { id: "vector", label: "평면벡터" },
    { id: "space-figure", label: "공간도형과 공간좌표" },
  ],
} as const;

export const DROPDOWN_SECTION: DropdownSection = {
  id: "common-math-2",
  options: CHAPTER_DROPDOWN_OPTIONS["common-math-2"],
  defaultOpen: true,
};

export const allChapterDropdownOptions = Object.values(
  CHAPTER_DROPDOWN_OPTIONS
).flat();
