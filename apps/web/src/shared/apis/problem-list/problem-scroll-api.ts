import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  GetProblemScrollParams,
  GetProblemScrollResponse,
} from "@/shared/apis/problem-list/problem-scroll-types";

const normalize = (v?: string | null) => (v ?? "").trim();

const cleanParams = (
  params: GetProblemScrollParams
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  const subjectId = normalize(params.subjectId);
  const unitId = normalize(params.unitId);
  const typeId = normalize(params.typeId);
  if (subjectId) out.subjectId = subjectId;
  if (unitId) out.unitId = unitId;
  if (typeId) out.typeId = typeId;
  if (params.sort) out.sort = params.sort;
  if (params.status) out.status = params.status;
  if (params.lastId !== undefined) out.lastId = params.lastId;
  if (params.lastCreatedAt) out.lastCreatedAt = params.lastCreatedAt;
  if (params.size !== undefined && params.size > 0) out.size = params.size;
  if (params.includePreviewUrl !== undefined)
    out.includePreviewUrl = params.includePreviewUrl;
  return out;
};

type RawScrollResponse = GetProblemScrollResponse & {
  next_cursor?: { last_id?: number; last_created_at?: string };
};

/** API가 snake_case(next_cursor, last_id, last_created_at)로 올 수 있으므로 camelCase로 정규화 */
const normalizeScrollResponse = (
  raw: RawScrollResponse
): GetProblemScrollResponse => {
  const snake = raw.next_cursor;
  const cursor = raw.nextCursor
    ? {
        lastId: raw.nextCursor.lastId,
        lastCreatedAt: raw.nextCursor.lastCreatedAt,
      }
    : snake
      ? {
          lastId: snake.last_id ?? 0,
          lastCreatedAt: snake.last_created_at ?? "",
        }
      : undefined;
  return {
    content: raw.content,
    hasNext: raw.hasNext,
    totalElements: raw.totalElements,
    ...(cursor && { nextCursor: cursor }),
  };
};

export const getProblemScroll = async (
  params: GetProblemScrollParams
): Promise<GetProblemScrollResponse> => {
  const res = await instance.get<ApiResponse<RawScrollResponse>>(
    API_PATHS.PROBLEM_LIST.SCROLL,
    {
      params: cleanParams(params),
    }
  );

  return normalizeScrollResponse(unwrapApiResponse(res.data));
};
