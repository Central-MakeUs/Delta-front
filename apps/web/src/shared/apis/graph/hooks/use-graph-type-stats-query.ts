import { useQuery } from "@tanstack/react-query";
import { graphQueryKeys } from "@/shared/apis/graph/graph-query-keys";
import { getGraphTypeStats } from "@/shared/apis/graph/graph-api";
import type {
  GraphGroup,
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";
import { resolveTypeLabel } from "@/shared/constants/math-curriculum";

export const useGraphTypeStatsQuery = (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: graphQueryKeys.typeStats(args.sort, args.req),
    enabled: args.enabled ?? true,
    queryFn: async (): Promise<GraphGroup[]> => {
      const items = await getGraphTypeStats({ sort: args.sort, req: args.req });

      return items.map((it) => ({
        id: it.type.id,
        label: resolveTypeLabel(it.type),
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
