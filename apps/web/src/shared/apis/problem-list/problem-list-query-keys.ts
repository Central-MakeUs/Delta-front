import type { GetProblemListParams } from "@/shared/apis/problem-list/problem-list-types";

const paramsKey = (params?: GetProblemListParams) => {
  if (!params) return null;
  const subjectId = params.subjectId ?? null;
  const unitId = params.unitId ?? null;
  const typeId = params.typeId ?? null;
  const sort = params.sort ?? null;
  const status = params.status ?? null;
  const page = params.page ?? null;
  const size = params.size ?? null;
  return `${subjectId ?? ""}|${unitId ?? ""}|${typeId ?? ""}|${sort ?? ""}|${status ?? ""}|${page ?? ""}|${size ?? ""}`;
};

export const problemListQueryKeys = {
  all: ["problem-list"] as const,

  list: (params?: GetProblemListParams) =>
    ["problem-list", "list", paramsKey(params)] as const,
} as const;
