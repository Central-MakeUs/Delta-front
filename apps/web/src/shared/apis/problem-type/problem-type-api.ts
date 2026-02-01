import { instance } from "@/shared/apis/api";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import type {
  ProblemTypeCreateRequest,
  ProblemTypeItem,
  ProblemTypeListResponse,
  ProblemTypeSetActiveRequest,
  ProblemTypeUpdateRequest,
} from "./problem-type-types";

export const getProblemTypes = async () => {
  const res = await instance.get<ApiResponse<ProblemTypeListResponse>>(
    API_PATHS.PROBLEM_TYPES.ROOT
  );

  return unwrapApiResponse(res.data).types;
};

export const createCustomType = async (body: ProblemTypeCreateRequest) => {
  const res = await instance.post<ApiResponse<ProblemTypeItem>>(
    API_PATHS.PROBLEM_TYPES.ROOT,
    body
  );
  return unwrapApiResponse(res.data);
};

export const updateCustomType = async (
  typeId: string,
  body: ProblemTypeUpdateRequest
) => {
  const res = await instance.patch<ApiResponse<ProblemTypeItem>>(
    API_PATHS.PROBLEM_TYPES.DETAIL(typeId),
    body
  );
  return unwrapApiResponse(res.data);
};

export const setProblemTypeActive = async (
  typeId: string,
  body: ProblemTypeSetActiveRequest
) => {
  const res = await instance.patch<ApiResponse<null>>(
    API_PATHS.PROBLEM_TYPES.ACTIVE(typeId),
    body
  );

  unwrapApiResponse(res.data);
};
