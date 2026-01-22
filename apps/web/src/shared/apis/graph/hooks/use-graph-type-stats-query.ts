import { useQuery } from "@tanstack/react-query";
import { graphQueryKeys } from "@/shared/apis/graph/graph-query-keys";
import { getGraphTypeStats } from "@/shared/apis/graph/graph-api";
import type {
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";
import { resolveTypeLabel } from "@/shared/constants/math-curriculum";
import { mapStatsToGraphGroups } from "@/shared/apis/graph/utils/map-stats-to-graph-groups";

export const useGraphTypeStatsQuery = (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: graphQueryKeys.typeStats(args.sort, args.req),
    enabled: args.enabled ?? true,
    queryFn: () => getGraphTypeStats({ sort: args.sort, req: args.req }),
    select: (items) =>
      mapStatsToGraphGroups({
        items,
        getId: (it) => it.type.id,
        getLabel: (it) => resolveTypeLabel(it.type),
      }),
  });
};
