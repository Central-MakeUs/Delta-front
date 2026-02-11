import { instance } from "@/shared/apis/api";
import { type ApiResponse, unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  GetProblemScrollParams,
  GetProblemScrollResponse,
} from "@/shared/apis/problem-list/problem-scroll-types";

type QueryParams = Record<
  string,
  string | number | string[] | boolean | undefined
>;

const trimFilter = (arr?: string[] | null): string[] =>
  (arr ?? []).map((s) => (s ?? "").trim()).filter(Boolean);

const toQueryParams = (params: GetProblemScrollParams): QueryParams => {
  const subjectIds = trimFilter(params.subjectIds);
  const unitIds = trimFilter(params.unitIds);
  const typeIds = trimFilter(params.typeIds);
  return {
    ...(subjectIds.length && { subjectIds }),
    ...(unitIds.length && { unitIds }),
    ...(typeIds.length && { typeIds }),
    ...(params.sort && { sort: params.sort }),
    ...(params.status && { status: params.status }),
    ...(params.lastId !== undefined && { lastId: params.lastId }),
    ...(params.lastCreatedAt && { lastCreatedAt: params.lastCreatedAt }),
    ...(params.size != null && params.size > 0 && { size: params.size }),
    ...(params.includePreviewUrl !== undefined && {
      includePreviewUrl: params.includePreviewUrl,
    }),
  };
};

const serializeParams = (p: QueryParams): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(p)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, String(v)));
    } else {
      search.append(key, String(value));
    }
  }
  return search.toString();
};

type RawScrollResponse = GetProblemScrollResponse & {
  next_cursor?: { last_id?: number; last_created_at?: string };
};

const toNextCursor = (raw: RawScrollResponse) => {
  const c = raw.nextCursor ?? raw.next_cursor;
  if (!c) return undefined;
  const lastId =
    "lastId" in c ? c.lastId : ((c as { last_id?: number }).last_id ?? 0);
  const lastCreatedAt =
    "lastCreatedAt" in c
      ? c.lastCreatedAt
      : ((c as { last_created_at?: string }).last_created_at ?? "");
  return { lastId, lastCreatedAt };
};

const normalizeResponse = (
  raw: RawScrollResponse
): GetProblemScrollResponse => {
  const cursor = toNextCursor(raw);
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
  const query = toQueryParams(params);
  const res = await instance.get<ApiResponse<RawScrollResponse>>(
    API_PATHS.PROBLEM_LIST.SCROLL,
    {
      params: query,
      paramsSerializer: serializeParams,
    }
  );
  return normalizeResponse(unwrapApiResponse(res.data));
};
