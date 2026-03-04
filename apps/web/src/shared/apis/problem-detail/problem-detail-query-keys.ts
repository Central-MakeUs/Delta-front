export const problemDetailQueryKeys = {
  all: ["problem-detail"] as const,

  detail: (problemId: number | string) =>
    [...problemDetailQueryKeys.all, "detail", String(problemId)] as const,

  solution: (problemId: number | string) =>
    [...problemDetailQueryKeys.all, "solution", String(problemId)] as const,
} as const;
