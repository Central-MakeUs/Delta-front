"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setProblemTypeActive } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";
import type { ProblemTypeSetActiveRequest } from "@/shared/apis/problem-type/problem-type-types";

type Variables = {
  typeId: string;
  body: ProblemTypeSetActiveRequest;
};

type Options = {
  onSuccess?: () => void;
};

export const useSetProblemTypeActiveMutation = (options?: Options) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ typeId, body }: Variables) =>
      setProblemTypeActive(typeId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: problemTypeQueryKeys.all });
      options?.onSuccess?.();
    },
  });
};
