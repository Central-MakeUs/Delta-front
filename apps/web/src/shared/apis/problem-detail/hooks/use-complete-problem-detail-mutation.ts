import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";

export const useCompleteProblemDetailMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      problemId,
      solutionText,
    }: {
      problemId: number | string;
      solutionText: string;
    }) => problemDetailApi.complete({ problemId, solutionText }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: problemDetailQueryKeys.detail(variables.problemId),
      });
    },
  });
};
