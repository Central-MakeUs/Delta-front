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
  { id: "U_COMMON_1", label: "공통수학 I" },
  { id: "U_COMMON_2", label: "공통수학 II" },
  { id: "U_ALGEBRA", label: "대수" },
  { id: "U_CALC_1", label: "미적분 I" },
  { id: "U_PROBSTAT", label: "확률과 통계" },
  { id: "U_CALC_2", label: "미적분 II" },
  { id: "U_GEOM", label: "기하" },
];

export const TYPE_FILTERS: TypeFilterItem[] = [
  { id: "T_SENTENCE", label: "문장형" },
  { id: "T_GRAPH_FIGURE", label: "그래프/도형" },
  { id: "T_COMPLEX", label: "복합 개념" },
  { id: "T_ABS", label: "절댓값" },
  { id: "T_CASE_SPLIT", label: "조건별 상황 나누기" },
  { id: "T_GNKND", label: "ㄱ, ㄴ, ㄷ" },
];

export const CHAPTER_DROPDOWN_OPTIONS = {
  U_COMMON_1: [
    { id: "U_C1_POLY", label: "다항식" },
    { id: "U_C1_EQ_INEQ", label: "방정식과 부등식" },
    { id: "U_C1_COUNTING", label: "경우의 수" },
    { id: "U_C1_MATRIX", label: "행렬" },
  ],
  U_COMMON_2: [
    { id: "U_C2_GEO_EQ", label: "도형의 방정식" },
    { id: "U_C2_SET_PROP", label: "집합과 명제" },
    { id: "U_C2_FUNC_GRAPH", label: "함수와 그래프" },
  ],
  U_ALGEBRA: [
    { id: "U_ALG_EXP_LOG", label: "지수함수와 로그함수" },
    { id: "U_ALG_TRIG", label: "삼각함수" },
    { id: "U_ALG_SEQ", label: "수열" },
  ],
  U_CALC_1: [
    { id: "U_CALC1_LIMIT", label: "함수의 극한과 연속" },
    { id: "U_CALC1_DIFF", label: "미분" },
    { id: "U_CALC1_INT", label: "적분" },
  ],
  U_PROBSTAT: [
    { id: "U_PS_COUNTING", label: "경우의 수" },
    { id: "U_PS_PROB", label: "확률" },
    { id: "U_PS_STAT", label: "통계" },
  ],
  U_CALC_2: [
    { id: "U_CALC2_SEQ_LIMIT", label: "수열의 극한" },
    { id: "U_CALC2_DIFF", label: "미분법" },
    { id: "U_CALC2_INT", label: "적분법" },
  ],
  U_GEOM: [
    { id: "U_GM_CONIC", label: "이차곡선" },
    { id: "U_GM_SPACE", label: "공간도형과 공간좌표" },
    { id: "U_GM_VECTOR", label: "벡터" },
  ],
} as const;

export const DROPDOWN_SECTION: DropdownSection = {
  id: "U_COMMON_2",
  options: CHAPTER_DROPDOWN_OPTIONS["U_COMMON_2"],
  defaultOpen: true,
};

export const allChapterDropdownOptions = Object.values(
  CHAPTER_DROPDOWN_OPTIONS
).flat();
