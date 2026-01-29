"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProblemMonthlyProgress } from "../problem-stats-api";
import type {
  ProblemMonthlyProgressRequest,
  ProblemMonthlyProgressResponse,
} from "../problem-stats-types";

export const problemMonthlyProgressQueryKey = (
  params: ProblemMonthlyProgressRequest
) => ["problems", "stats", "monthly", params.year, params.month] as const;

type Options = Omit<
  UseQueryOptions<
    ProblemMonthlyProgressResponse,
    Error,
    ProblemMonthlyProgressResponse,
    ReturnType<typeof problemMonthlyProgressQueryKey>
  >,
  "queryKey" | "queryFn"
>;

export const useProblemMonthlyProgressQuery = (
  params: ProblemMonthlyProgressRequest,
  options?: Options
) => {
  return useQuery({
    queryKey: problemMonthlyProgressQueryKey(params),
    queryFn: () => getProblemMonthlyProgress(params),
    enabled:
      Number.isFinite(params.year) &&
      Number.isFinite(params.month) &&
      params.month >= 1 &&
      params.month <= 12,
    ...options,
  });
};
