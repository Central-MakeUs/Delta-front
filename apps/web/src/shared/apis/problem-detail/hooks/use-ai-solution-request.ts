import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";

export const AI_SOLUTION_MUTATION_KEY = ["problem-detail", "solution"] as const;

export const useAiSolutionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AI_SOLUTION_MUTATION_KEY,
    mutationFn: ({ problemId }: { problemId: number | string }) =>
      problemDetailApi.solution({ problemId }),
    onSuccess: (_, { problemId }) => {
      queryClient.invalidateQueries({
        queryKey: problemDetailQueryKeys.solution(problemId),
      });
    },
  });
};
