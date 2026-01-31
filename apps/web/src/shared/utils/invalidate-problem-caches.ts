import { QueryClient } from "@tanstack/react-query";
import { graphQueryKeys } from "@/shared/apis/graph/graph-query-keys";
import { problemStatsQueryKeys } from "@/shared/apis/problem-stats/problem-stats-query-keys";
import { problemListQueryKeys } from "@/shared/apis/problem-list/problem-list-query-keys";

export const invalidateProblemCaches = (qc: QueryClient) =>
  Promise.all([
    qc.invalidateQueries({
      queryKey: problemStatsQueryKeys.all,
      exact: false,
      refetchType: "all",
    }),
    qc.invalidateQueries({
      queryKey: graphQueryKeys.all,
      exact: false,
      refetchType: "all",
    }),
    qc.invalidateQueries({
      queryKey: problemListQueryKeys.all,
      exact: false,
      refetchType: "all",
    }),
  ]);
