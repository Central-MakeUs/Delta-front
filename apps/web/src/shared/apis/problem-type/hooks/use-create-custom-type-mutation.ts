"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomType } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";
import type { ProblemTypeCreateRequest } from "@/shared/apis/problem-type/problem-type-types";

type Options = {
  onSuccess?: () => void;
};

export const useCreateCustomTypeMutation = (options?: Options) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: ProblemTypeCreateRequest) => createCustomType(body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: problemTypeQueryKeys.all });
      options?.onSuccess?.();
    },
  });
};
