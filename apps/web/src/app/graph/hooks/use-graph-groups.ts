import { useMemo } from "react";
import { GRAPH_TABS, type GraphTab } from "@/shared/constants/routes";
import type { ProblemStatsSort } from "@/shared/apis/graph/graph-types";
import { useGraphUnitStatsQuery } from "@/shared/apis/graph/hooks/use-graph-unit-stats-query";
import { useGraphTypeStatsQuery } from "@/shared/apis/graph/hooks/use-graph-type-stats-query";

export const useGraphGroups = (tab: GraphTab, sort: ProblemStatsSort) => {
  const unitStatsQuery = useGraphUnitStatsQuery({
    sort,
    enabled: tab === GRAPH_TABS.UNIT,
  });

  const typeStatsQuery = useGraphTypeStatsQuery({
    sort,
    enabled: tab === GRAPH_TABS.WRONG,
  });

  const unitGroups = unitStatsQuery.data ?? [];
  const typeGroups = typeStatsQuery.data ?? [];

  const groups = useMemo(
    () => (tab === GRAPH_TABS.UNIT ? unitGroups : typeGroups),
    [tab, unitGroups, typeGroups]
  );

  return { groups, unitStatsQuery, typeStatsQuery };
};
