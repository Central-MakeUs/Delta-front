import type { ApiResponse } from "@/shared/apis/api-types";

export type ProblemMonthlyProgressRequest = {
  year: number;
  month: number;
};

export type ProblemMonthlyProgressResponse = {
  yearMonth: string;
  totalCount: number;
  solvedCount: number;
  unsolvedCount: number;
};

export type ApiResponseProblemMonthlyProgressResponse =
  ApiResponse<ProblemMonthlyProgressResponse>;
