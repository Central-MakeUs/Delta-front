import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";
import type { UpdateProblemRequest } from "@/shared/apis/problem-detail/problem-detail-types";

export const useUpdateProblemDetailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      problemId,
      body,
    }: {
      problemId: number | string;
      body: UpdateProblemRequest;
    }) => problemDetailApi.update({ problemId, body }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: problemDetailQueryKeys.detail(variables.problemId),
      });
      await queryClient.refetchQueries({
        queryKey: problemDetailQueryKeys.detail(variables.problemId),
      });
    },
  });
};
