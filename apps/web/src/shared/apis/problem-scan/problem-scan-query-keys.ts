export const problemScanQueryKeys = {
  all: ["problem-scans"] as const,

  summary: (scanId: number | string) =>
    [...problemScanQueryKeys.all, "summary", String(scanId)] as const,
} as const;
