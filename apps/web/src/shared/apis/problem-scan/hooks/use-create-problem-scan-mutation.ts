import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { problemScanQueryKeys } from "@/shared/apis/problem-scan/problem-scan-query-keys";

export const useCreateProblemScanMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { file: File }) => problemScanApi.create(params),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: problemScanQueryKeys.all });

      if (data.scanId) {
        qc.invalidateQueries({
          queryKey: problemScanQueryKeys.summary(data.scanId),
        });
      }
    },
  });
};
