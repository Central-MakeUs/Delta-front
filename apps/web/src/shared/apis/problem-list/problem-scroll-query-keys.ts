import type { GetProblemScrollParams } from "@/shared/apis/problem-list/problem-scroll-types";

const baseParamsKey = (params?: GetProblemScrollParams) => {
  if (!params) return null;
  const subjectIds = params.subjectIds?.join(",") ?? "";
  const unitIds = params.unitIds?.join(",") ?? "";
  const typeIds = params.typeIds?.join(",") ?? "";
  const sort = params.sort ?? null;
  const status = params.status ?? null;
  const size = params.size ?? null;
  const includePreviewUrl = params.includePreviewUrl ?? null;
  return `${subjectIds}|${unitIds}|${typeIds}|${sort ?? ""}|${status ?? ""}|${size ?? ""}|${includePreviewUrl ?? ""}`;
};

export const problemScrollQueryKeys = {
  all: ["problem-scroll"] as const,

  infinite: (
    params?: Omit<GetProblemScrollParams, "lastId" | "lastCreatedAt">
  ) => ["problem-scroll", "infinite", baseParamsKey(params)] as const,
} as const;
