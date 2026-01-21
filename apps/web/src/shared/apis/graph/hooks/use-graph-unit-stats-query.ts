import { useQuery } from "@tanstack/react-query";
import { graphQueryKeys } from "@/shared/apis/graph/graph-query-keys";
import { getGraphUnitStats } from "@/shared/apis/graph/graph-api";
import type {
  GraphGroup,
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";
import { resolveUnitLabel } from "@/shared/constants/math-curriculum";

export const useGraphUnitStatsQuery = (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: graphQueryKeys.unitStats(args.sort, args.req),
    enabled: args.enabled ?? true,
    queryFn: async (): Promise<GraphGroup[]> => {
      const items = await getGraphUnitStats({ sort: args.sort, req: args.req });

      return items.map((it) => ({
        id: it.unit.id,
        label: resolveUnitLabel(it.unit),
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
      }));
    },
  });
};
