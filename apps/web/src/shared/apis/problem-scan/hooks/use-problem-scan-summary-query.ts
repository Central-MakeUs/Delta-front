import { useQuery } from "@tanstack/react-query";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { problemScanQueryKeys } from "@/shared/apis/problem-scan/problem-scan-query-keys";

export const useProblemScanSummaryQuery = (scanId: number | string | null) => {
  return useQuery({
    queryKey: scanId
      ? problemScanQueryKeys.summary(scanId)
      : problemScanQueryKeys.all,
    queryFn: () =>
      problemScanApi.getSummary({ scanId: scanId as number | string }),
    enabled: !!scanId,
    placeholderData: undefined,
  });
};
