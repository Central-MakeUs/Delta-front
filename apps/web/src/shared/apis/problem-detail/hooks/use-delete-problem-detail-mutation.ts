import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";
import { invalidateProblemCaches } from "@/shared/utils/invalidate-problem-caches";

export const DELETE_PROBLEM_DETAIL_MUTATION_KEY = [
  "problem-detail",
  "delete",
] as const;

export const useDeleteProblemDetailMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: DELETE_PROBLEM_DETAIL_MUTATION_KEY,
    mutationFn: (problemId: number | string) =>
      problemDetailApi.delete(problemId),

    onSuccess: async (_, problemId) => {
      qc.removeQueries({
        queryKey: problemDetailQueryKeys.detail(problemId),
        exact: true,
      });

      await invalidateProblemCaches(qc);
    },
  });
};
