import { instance } from "@/shared/apis/api";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ApiResponseTypeStats,
  ApiResponseUnitStats,
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";

const normalize = (v?: string | null) => (v ?? "").trim();

const omitEmpty = (req?: ProblemStatsRequest) => {
  const out: Record<string, string> = {};
  if (!req) return out;

  const subjectId = normalize(req.subjectId);
  const unitId = normalize(req.unitId);
  const typeId = normalize(req.typeId);

  if (subjectId) out.subjectId = subjectId;
  if (unitId) out.unitId = unitId;
  if (typeId) out.typeId = typeId;

  return out;
};

export const getGraphUnitStats = async (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
}) => {
  const res = await instance.get<ApiResponseUnitStats>(
    API_PATHS.PROBLEM_STATS.UNITS,
    {
      params: { sort: args.sort, ...omitEmpty(args.req) },
    }
  );
  return unwrapApiResponse(res.data).items ?? [];
};

export const getGraphTypeStats = async (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
}) => {
  const res = await instance.get<ApiResponseTypeStats>(
    API_PATHS.PROBLEM_STATS.TYPES,
    {
      params: { sort: args.sort, ...omitEmpty(args.req) },
    }
  );
  return unwrapApiResponse(res.data).items ?? [];
};
