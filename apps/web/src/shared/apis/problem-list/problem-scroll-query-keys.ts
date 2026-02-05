import type { GetProblemScrollParams } from "@/shared/apis/problem-list/problem-scroll-types";

const baseParamsKey = (params?: GetProblemScrollParams) => {
  if (!params) return null;
  const subjectId = params.subjectId ?? null;
  const unitId = params.unitId ?? null;
  const typeId = params.typeId ?? null;
  const sort = params.sort ?? null;
  const status = params.status ?? null;
  const size = params.size ?? null;
  const includePreviewUrl = params.includePreviewUrl ?? null;
  return `${subjectId ?? ""}|${unitId ?? ""}|${typeId ?? ""}|${sort ?? ""}|${status ?? ""}|${size ?? ""}|${includePreviewUrl ?? ""}`;
};

export const problemScrollQueryKeys = {
  all: ["problem-scroll"] as const,

  infinite: (
    params?: Omit<GetProblemScrollParams, "lastId" | "lastCreatedAt">
  ) => ["problem-scroll", "infinite", baseParamsKey(params)] as const,
} as const;
