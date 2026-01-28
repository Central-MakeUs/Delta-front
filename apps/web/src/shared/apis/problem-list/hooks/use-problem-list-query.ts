import { useQuery } from "@tanstack/react-query";
import { problemListQueryKeys } from "@/shared/apis/problem-list/problem-list-query-keys";
import { getProblemList } from "@/shared/apis/problem-list/problem-list-api";
import type { GetProblemListParams } from "@/shared/apis/problem-list/problem-list-types";

export const useProblemListQuery = (args: {
  params?: GetProblemListParams;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: problemListQueryKeys.list(args.params),
    enabled: args.enabled ?? true,
    queryFn: () => getProblemList(args.params ?? {}),
  });
};
