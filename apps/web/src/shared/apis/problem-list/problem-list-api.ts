import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  GetProblemListParams,
  GetProblemListResponse,
} from "@/shared/apis/problem-list/problem-list-types";

const normalize = (v?: string | null) => (v ?? "").trim();

const cleanParams = (params: GetProblemListParams): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  const subjectId = normalize(params.subjectId);
  const unitId = normalize(params.unitId);
  const typeId = normalize(params.typeId);
  if (subjectId) out.subjectId = subjectId;
  if (unitId) out.unitId = unitId;
  if (typeId) out.typeId = typeId;
  if (params.sort) out.sort = params.sort;
  if (params.status) out.status = params.status;
  if (params.page !== undefined) out.page = params.page;
  if (params.size !== undefined && params.size > 0) out.size = params.size;
  return out;
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
