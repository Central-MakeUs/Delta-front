import { instance } from "@/shared/apis/api";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import type {
  ApiResponseProblemMonthlyProgressResponse,
  ProblemMonthlyProgressRequest,
} from "./problem-stats-types";

export const getProblemMonthlyProgress = async (
  params: ProblemMonthlyProgressRequest
) => {
  const res = await instance.get<ApiResponseProblemMonthlyProgressResponse>(
    API_PATHS.PROBLEM_STATS.MONTHLY,
    { params }
  );

  return unwrapApiResponse(res.data);
};
