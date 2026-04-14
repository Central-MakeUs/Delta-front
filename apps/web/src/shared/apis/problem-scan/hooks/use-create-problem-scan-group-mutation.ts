import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { problemScanQueryKeys } from "@/shared/apis/problem-scan/problem-scan-query-keys";

export const useCreateProblemScanGroupMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { files: File[] }) => problemScanApi.createGroup(params),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: problemScanQueryKeys.all });

      data.scanIds.forEach((scanId) => {
        qc.invalidateQueries({
          queryKey: problemScanQueryKeys.summary(scanId),
        });
      });
    },
  });
};

export default useCreateProblemScanGroupMutation;
