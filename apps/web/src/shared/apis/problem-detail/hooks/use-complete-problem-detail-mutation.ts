import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";
import { invalidateProblemCaches } from "@/shared/utils/invalidate-problem-caches";
import type { ProblemDetailResponse } from "@/shared/apis/problem-detail/problem-detail-types";

export const COMPLETE_PROBLEM_DETAIL_MUTATION_KEY = [
  "problem-detail",
  "complete",
] as const;

export const useCompleteProblemDetailMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: COMPLETE_PROBLEM_DETAIL_MUTATION_KEY,
    mutationFn: ({
      problemId,
      memoText,
    }: {
      problemId: number | string;
      memoText: string;
    }) => problemDetailApi.complete({ problemId, memoText }),

    onSuccess: async (_, variables) => {
      qc.setQueryData<ProblemDetailResponse | undefined>(
        problemDetailQueryKeys.detail(variables.problemId),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            completed: true,
            memoText: variables.memoText,
          };
        }
      );

      await Promise.all([
        qc.invalidateQueries({
          queryKey: problemDetailQueryKeys.detail(variables.problemId),
        }),
        invalidateProblemCaches(qc),
      ]);
    },
  });
};
