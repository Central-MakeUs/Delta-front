import type { GraphSortId } from "@/app/graph/constants/sort";
import type { ProblemStatsSort } from "@/shared/apis/graph/graph-types";

export const SORT_TO_API: Record<GraphSortId, ProblemStatsSort> = {
  "most-wrong": "MAX",
  "least-wrong": "MIN",
  default: "DEFAULT",
};
