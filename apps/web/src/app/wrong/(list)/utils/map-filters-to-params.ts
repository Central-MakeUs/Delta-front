import type {
  GetProblemScrollParams,
  ProblemScrollSort,
  ProblemScrollStatus,
} from "@/shared/apis/problem-list/problem-scroll-types";

/** 스크롤 API용 파라미터. sort는 RECENT/OLDEST만 지원. */
export const mapFiltersToScrollParams = (state: {
  selectedChapterIds: string[];
  selectedDropdownIds: Record<string, string[]>;
  selectedTypeIds: string[];
  selectedSortId: string;
}): Omit<GetProblemScrollParams, "lastId" | "lastCreatedAt"> => {
  const {
    selectedChapterIds,
    selectedDropdownIds,
    selectedTypeIds,
    selectedSortId,
  } = state;

  const params: Omit<GetProblemScrollParams, "lastId" | "lastCreatedAt"> = {
    size: 20,
    includePreviewUrl: true,
    sort: "RECENT",
    status: "ALL",
  };

  if (selectedChapterIds[0]) params.subjectId = selectedChapterIds[0];

  const unitId = Object.values(selectedDropdownIds).flat()[0];
  if (unitId) params.unitId = unitId;

  if (selectedTypeIds[0]) params.typeId = selectedTypeIds[0];

  const sortMap: Record<
    string,
    { sort: ProblemScrollSort; status: ProblemScrollStatus }
  > = {
    recent: { sort: "RECENT", status: "ALL" },
    "wrong-incomplete": { sort: "RECENT", status: "UNSOLVED" },
    "wrong-complete": { sort: "RECENT", status: "SOLVED" },
    "type-desc": { sort: "RECENT", status: "ALL" },
    "type-asc": { sort: "OLDEST", status: "ALL" },
  };

  return { ...params, ...sortMap[selectedSortId] };
};
