import type {
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";

const reqKey = (req?: ProblemStatsRequest) => {
  if (!req) return null;
  const subjectId = req.subjectId ?? null;
  const unitId = req.unitId ?? null;
  const typeId = req.typeId ?? null;
  return `${subjectId ?? ""}|${unitId ?? ""}|${typeId ?? ""}`;
};

export const graphQueryKeys = {
  all: ["graph"] as const,

  unitStats: (sort: ProblemStatsSort, req?: ProblemStatsRequest) =>
    ["graph", "unit-stats", sort, reqKey(req)] as const,

  typeStats: (sort: ProblemStatsSort, req?: ProblemStatsRequest) =>
    ["graph", "type-stats", sort, reqKey(req)] as const,
} as const;
