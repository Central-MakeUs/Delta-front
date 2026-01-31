import type { ProblemMonthlyProgressRequest } from "@/shared/apis/problem-stats/problem-stats-types";

export const problemStatsQueryKeys = {
  all: ["problems", "stats"] as const,

  monthly: (params: ProblemMonthlyProgressRequest) =>
    [
      ...problemStatsQueryKeys.all,
      "monthly",
      params.year,
      params.month,
    ] as const,
} as const;
