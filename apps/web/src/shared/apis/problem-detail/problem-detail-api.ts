import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ProblemDetailResponse,
  UpdateProblemRequest,
} from "@/shared/apis/problem-detail/problem-detail-types";

export const problemDetailApi = {
  getDetail: async (problemId: number | string) => {
    const res = await instance.get<ApiResponse<ProblemDetailResponse>>(
      API_PATHS.PROBLEM_DETAIL.DETAIL(problemId)
    );
    return unwrapApiResponse(res.data);
  },

  update: async ({
    problemId,
    body,
  }: {
    problemId: number | string;
    body: UpdateProblemRequest;
  }) => {
    const res = await instance.patch<ApiResponse<ProblemDetailResponse>>(
      API_PATHS.PROBLEM_DETAIL.DETAIL(problemId),
      body
    );
    return unwrapApiResponse(res.data);
  },

  complete: async ({
    problemId,
    solutionText,
  }: {
    problemId: number | string;
    solutionText: string;
  }) => {
    const res = await instance.post<ApiResponse<null>>(
      API_PATHS.PROBLEM_DETAIL.COMPLETE(problemId),
      { solutionText }
    );
    return unwrapApiResponse(res.data);
  },

  delete: async (problemId: number | string) => {
    const res = await instance.delete<ApiResponse<null>>(
      API_PATHS.PROBLEM_DETAIL.DETAIL(problemId)
    );
    return unwrapApiResponse(res.data);
  },
};
