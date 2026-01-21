import type { SortOption } from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

export const GRAPH_SORT_OPTIONS = [
  { id: "most-wrong", label: "최다 오답순" },
  { id: "least-wrong", label: "최소 오답순" },
  { id: "default", label: "단원순" },
] as const satisfies readonly SortOption[];

export type GraphSortId = (typeof GRAPH_SORT_OPTIONS)[number]["id"];

export const UNIT_ORDER = [
  "공통수학1",
  "공통수학2",
  "대수",
  "미적분I",
  "확률과 통계",
  "미적분II",
  "기하",
] as const;

export const unitOrderIndex = new Map<string, number>(
  UNIT_ORDER.map((label, idx) => [label, idx])
);
