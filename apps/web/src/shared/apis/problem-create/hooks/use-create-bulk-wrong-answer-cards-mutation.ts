import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBulkWrongAnswerCards } from "@/shared/apis/problem-create/problem-create-api";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import { invalidateProblemCaches } from "@/shared/utils/invalidate-problem-caches";

export const useCreateBulkWrongAnswerCardsMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: ProblemCreateRequest[]) => createBulkWrongAnswerCards(body),
    onSuccess: () => invalidateProblemCaches(qc),
  });
};

export default useCreateBulkWrongAnswerCardsMutation;
