import { useQuery } from "@tanstack/react-query";
import { graphQueryKeys } from "@/shared/apis/graph/graph-query-keys";
import { getGraphUnitStats } from "@/shared/apis/graph/graph-api";
import type {
  ProblemStatsRequest,
  ProblemStatsSort,
} from "@/shared/apis/graph/graph-types";
import { resolveUnitLabel } from "@/shared/constants/math-curriculum";
import { mapStatsToGraphGroups } from "@/shared/apis/graph/utils/map-stats-to-graph-groups";

export const useGraphUnitStatsQuery = (args: {
  sort: ProblemStatsSort;
  req?: ProblemStatsRequest;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: graphQueryKeys.unitStats(args.sort, args.req),
    enabled: args.enabled ?? true,
    queryFn: () => getGraphUnitStats({ sort: args.sort, req: args.req }),
    select: (items) =>
      mapStatsToGraphGroups({
        items,
        getId: (it) => it.unit.id,
        getLabel: (it) => resolveUnitLabel(it.unit),
      }),
  });
};
