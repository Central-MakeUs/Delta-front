import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ProblemCreateRequest,
  ProblemCreateResponse,
} from "@/shared/apis/problem-create/problem-create-types";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export const createWrongAnswerCard = async (
  body: ProblemCreateRequest
): Promise<ProblemCreateResponse> => {
  const res = await instance.post<ApiResponse<ProblemCreateResponse>>(
    API_PATHS.PROBLEM_CREATE.ROOT,
    body
  );

  const json = res.data;

  if (json.status !== 200 || !json.data) {
    throw new ApiError(
      json.message ?? "요청에 실패했어요.",
      json.status,
      json.code
    );
  }

  return json.data;
};
