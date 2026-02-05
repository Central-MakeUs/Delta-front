"use client";

import { useQuery } from "@tanstack/react-query";
import { getProblemTypes } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";

export const useProblemTypesQuery = () => {
  return useQuery({
    queryKey: problemTypeQueryKeys.list(),
    queryFn: getProblemTypes,
  });
};
