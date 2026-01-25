import { GetProblemListParams } from "@/shared/apis/problem-list/problem-list-types";

export const mapFiltersToApiParams = (state: {
  selectedChapterIds: string[];
  selectedDropdownIds: Record<string, string[]>;
  selectedTypeIds: string[];
  selectedSortId: string;
}): GetProblemListParams => {
  const {
    selectedChapterIds,
    selectedDropdownIds,
    selectedTypeIds,
    selectedSortId,
  } = state;

  const params: GetProblemListParams = {
    page: 0,
    size: 20,
    sort: "RECENT",
    status: "ALL",
  };

  if (selectedChapterIds[0]) params.subjectId = selectedChapterIds[0];

  const unitId = Object.values(selectedDropdownIds).flat()[0];
  if (unitId) params.unitId = unitId as string;

  if (selectedTypeIds[0]) params.typeId = selectedTypeIds[0];

  const sortMap: Record<string, Partial<GetProblemListParams>> = {
    recent: { sort: "RECENT", status: "ALL" },
    "wrong-incomplete": { sort: "RECENT", status: "UNSOLVED" },
    "wrong-complete": { sort: "RECENT", status: "SOLVED" },
    "type-desc": { sort: "TYPE_MOST", status: "ALL" },
    "type-asc": { sort: "TYPE_LEAST", status: "ALL" },
  };

  return { ...params, ...sortMap[selectedSortId] };
};
