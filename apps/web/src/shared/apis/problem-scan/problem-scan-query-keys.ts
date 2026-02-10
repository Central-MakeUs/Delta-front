export const problemScanQueryKeys = {
  all: ["problem-scans"] as const,

  summary: (scanId: number | string) =>
    [...problemScanQueryKeys.all, "summary", String(scanId)] as const,
  summaryDisabled: () =>
    [...problemScanQueryKeys.all, "summary", "disabled"] as const,
} as const;
