import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { normalizeTypeName } from "@/app/wrong/create/utils/normalize-type-name";

export const findTypeIdByName = (types: ProblemTypeItem[], name: string) => {
  const key = normalizeTypeName(name);
  const hit = types.find((t) => normalizeTypeName(t.name) === key);
  return hit?.id ?? null;
};
