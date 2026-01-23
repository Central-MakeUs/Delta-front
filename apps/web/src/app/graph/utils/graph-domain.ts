import type { GraphGroup } from "@/shared/apis/graph/graph-types";

export const computeDomain = (groups: readonly GraphGroup[]) => {
  const values = groups.flatMap((g) => g.rows.map((r) => r.value));
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 1;
  return { minValue, maxValue };
};
