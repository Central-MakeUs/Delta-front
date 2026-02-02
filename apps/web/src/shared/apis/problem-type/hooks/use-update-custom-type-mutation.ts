"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomType } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";
import type { ProblemTypeUpdateRequest } from "@/shared/apis/problem-type/problem-type-types";

type Variables = {
  typeId: string;
  body: ProblemTypeUpdateRequest;
};

type Options = {
  onSuccess?: () => void;
};

export const useUpdateCustomTypeMutation = (options?: Options) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ typeId, body }: Variables) => updateCustomType(typeId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: problemTypeQueryKeys.all });
      options?.onSuccess?.();
    },
  });
};
