import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  GetProblemListParams,
  GetProblemListResponse,
} from "@/shared/apis/problem-list/problem-list-types";

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

export const getProblemList = async (
  params: GetProblemListParams
): Promise<GetProblemListResponse> => {
  const cleanedParams: Record<string, unknown> = {};

  if (params.subjectId && params.subjectId.trim() !== "") {
    cleanedParams.subjectId = params.subjectId;
  }
  if (params.unitId && params.unitId.trim() !== "") {
    cleanedParams.unitId = params.unitId;
  }
  if (params.typeId && params.typeId.trim() !== "") {
    cleanedParams.typeId = params.typeId;
  }
  if (params.sort) {
    cleanedParams.sort = params.sort;
  }
  // status 값이 있으면 항상 전달 (ALL, UNSOLVED, SOLVED)
  if (params.status) {
    cleanedParams.status = params.status;
  }
  if (params.page !== undefined) {
    cleanedParams.page = params.page;
  }
  if (params.size !== undefined && params.size > 0) {
    cleanedParams.size = params.size;
  }

  const res = await instance.get<ApiResponse<GetProblemListResponse>>(
    API_PATHS.PROBLEM_LIST.ROOT,
    { params: cleanedParams }
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
