import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProblemMonthlyProgress } from "@/shared/apis/problem-stats/problem-stats-api";
import type {
  ProblemMonthlyProgressRequest,
  ProblemMonthlyProgressResponse,
} from "@/shared/apis/problem-stats/problem-stats-types";
import { problemStatsQueryKeys } from "@/shared/apis/problem-stats/problem-stats-query-keys";

type Options = Omit<
  UseQueryOptions<
    ProblemMonthlyProgressResponse,
    Error,
    ProblemMonthlyProgressResponse,
    ReturnType<typeof problemStatsQueryKeys.monthly>
  >,
  "queryKey" | "queryFn"
>;

export const useProblemMonthlyProgressQuery = (
  params: ProblemMonthlyProgressRequest,
  options?: Options
) => {
  return useQuery({
    queryKey: problemStatsQueryKeys.monthly(params),
    queryFn: () => getProblemMonthlyProgress(params),
    enabled:
      Number.isFinite(params.year) &&
      Number.isFinite(params.month) &&
      params.month >= 1 &&
      params.month <= 12,
    ...options,
  });
};
