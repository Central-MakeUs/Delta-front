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

  const subjectIds = selectedChapterIds.filter((id) => (id ?? "").trim());
  if (subjectIds.length) params.subjectIds = subjectIds;

  const unitIds = Object.values(selectedDropdownIds)
    .flat()
    .filter((id) => (id ?? "").trim());
  if (unitIds.length) params.unitIds = unitIds;

  const typeIds = selectedTypeIds.filter((id) => (id ?? "").trim());
  if (typeIds.length) params.typeIds = typeIds;

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
