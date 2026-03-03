import { useQuery } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";

export const useGetSolutionQuery = (problemId?: number | string) => {
  const enabled = problemId !== undefined && problemId !== null;
  return useQuery({
    queryKey: enabled
      ? problemDetailQueryKeys.solution(problemId!)
      : problemDetailQueryKeys.all,
    queryFn: () => problemDetailApi.getSolution({ problemId: problemId! }),
    enabled,
  });
};
