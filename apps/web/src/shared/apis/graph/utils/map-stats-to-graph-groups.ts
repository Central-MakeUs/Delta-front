import type { GraphGroup } from "@/shared/apis/graph/graph-types";

type StatsBase = {
  solvedCount: number;
  unsolvedCount: number;
};

export const mapStatsToGraphGroups = <T extends StatsBase>(args: {
  items: T[];
  getId: (it: T) => string | number;
  getLabel: (it: T) => string;
}): GraphGroup[] => {
  const { items, getId, getLabel } = args;

  return items.map(
    (it): GraphGroup => ({
      id: String(getId(it)),
      label: getLabel(it),
      rows: [
        {
          id: "unsolved",
          label: "오답 전",
          value: it.unsolvedCount,
          tone: "inactive" as const,
        },
        {
          id: "solved",
          label: "오답 완료",
          value: it.solvedCount,
          tone: "active" as const,
        },
      ],
    })
  );
};
