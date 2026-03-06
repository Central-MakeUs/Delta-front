import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ProblemDetailResponse,
  SolutionResponse,
  UpdateProblemRequest,
} from "@/shared/apis/problem-detail/problem-detail-types";
import type { AiSolutionTaskResponse } from "@/shared/apis/problem-detail/problem-detail-types";

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
    memoText,
  }: {
    problemId: number | string;
    memoText: string;
  }) => {
    const res = await instance.post<ApiResponse<null>>(
      API_PATHS.PROBLEM_DETAIL.COMPLETE(problemId),
      { memoText }
    );
    return unwrapApiResponse(res.data);
  },

  solution: async ({ problemId }: { problemId: number | string }) => {
    const res = await instance.post<ApiResponse<AiSolutionTaskResponse>>(
      API_PATHS.PROBLEM_DETAIL.SOLUTION(problemId)
    );
    return unwrapApiResponse(res.data);
  },

  getSolution: async ({ problemId }: { problemId: number | string }) => {
    const res = await instance.get<ApiResponse<SolutionResponse>>(
      API_PATHS.PROBLEM_DETAIL.GET_SOLUTION(problemId)
    );
    return unwrapApiResponse(res.data);
  },

  deleteSolution: async (problemId: number | string) => {
    const res = await instance.delete<ApiResponse<null>>(
      API_PATHS.PROBLEM_DETAIL.DELETE_SOLUTION(problemId)
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
