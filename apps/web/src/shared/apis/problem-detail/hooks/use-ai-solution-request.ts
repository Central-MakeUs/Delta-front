import { useMutation } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";

export const AI_SOLUTION_MUTATION_KEY = ["problem-detail", "solution"] as const;

export const useAiSolutionRequest = () => {
  return useMutation({
    mutationKey: AI_SOLUTION_MUTATION_KEY,
    mutationFn: ({ problemId }: { problemId: number | string }) =>
      problemDetailApi.solution({ problemId }),
  });
};
