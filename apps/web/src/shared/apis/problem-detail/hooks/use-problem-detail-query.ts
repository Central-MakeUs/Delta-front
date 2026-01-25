import { useQuery } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";

export const useProblemDetailQuery = (problemId: number | string | null) => {
  return useQuery({
    queryKey: problemId
      ? problemDetailQueryKeys.detail(problemId)
      : problemDetailQueryKeys.all,
    queryFn: () =>
      problemDetailApi.getDetail({ problemId: problemId as number | string }),
    enabled: !!problemId,
  });
};
