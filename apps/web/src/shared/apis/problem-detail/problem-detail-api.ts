import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type { ProblemDetailResponse } from "@/shared/apis/problem-detail/problem-detail-types";

export const problemDetailApi = {
  getDetail: async (params: { problemId: number | string }) => {
    const res = await instance.get<ApiResponse<ProblemDetailResponse>>(
      API_PATHS.PROBLEM_DETAIL.DETAIL(params.problemId)
    );
    return unwrapApiResponse(res.data);
  },

  complete: async (params: {
    problemId: number | string;
    solutionText: string;
  }) => {
    const res = await instance.post<ApiResponse<null>>(
      API_PATHS.PROBLEM_DETAIL.COMPLETE(params.problemId),
      { solutionText: params.solutionText }
    );
    return unwrapApiResponse(res.data);
  },
};
