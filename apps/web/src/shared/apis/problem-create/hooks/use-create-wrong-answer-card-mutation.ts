import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWrongAnswerCard } from "@/shared/apis/problem-create/problem-create-api";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import { invalidateProblemCaches } from "@/shared/utils/invalidate-problem-caches";

export const useCreateWrongAnswerCardMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: ProblemCreateRequest) => createWrongAnswerCard(body),
    onSuccess: () => invalidateProblemCaches(qc),
  });
};
