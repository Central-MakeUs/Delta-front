import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";

export const DELETE_SOLUTION_MUTATION_KEY = [
  "problem-detail",
  "delete-solution",
] as const;

export const useDeleteSolutionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DELETE_SOLUTION_MUTATION_KEY,
    mutationFn: (problemId: number | string) =>
      problemDetailApi.deleteSolution(problemId),
    onSuccess: (_, problemId) => {
      queryClient.invalidateQueries({
        queryKey: problemDetailQueryKeys.solution(problemId),
      });
    },
  });
};
