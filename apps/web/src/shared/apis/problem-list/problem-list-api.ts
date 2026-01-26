import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  GetProblemListParams,
  GetProblemListResponse,
} from "@/shared/apis/problem-list/problem-list-types";

const cleanParams = (params: GetProblemListParams): Record<string, unknown> => {
  const cleaned: Record<string, unknown> = {};

  if (params.subjectId?.trim()) {
    cleaned.subjectId = params.subjectId;
  }
  if (params.unitId?.trim()) {
    cleaned.unitId = params.unitId;
  }
  if (params.typeId?.trim()) {
    cleaned.typeId = params.typeId;
  }

  if (params.sort) {
    cleaned.sort = params.sort;
  }
  if (params.status) {
    cleaned.status = params.status;
  }
  if (params.page !== undefined) {
    cleaned.page = params.page;
  }
  if (params.size !== undefined && params.size > 0) {
    cleaned.size = params.size;
  }

  return cleaned;
};

export const getProblemList = async (
  params: GetProblemListParams
): Promise<GetProblemListResponse> => {
  const res = await instance.get<ApiResponse<GetProblemListResponse>>(
    API_PATHS.PROBLEM_LIST.ROOT,
    { params: cleanParams(params) }
  );

  return unwrapApiResponse(res.data);
};
