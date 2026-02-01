"use client";

import { useMemo } from "react";
import { normalize } from "@/app/wrong/create/utils/label-match";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { findTypeIdByName } from "@/app/wrong/create/utils/find-type-id-by-name";

type SummaryLike =
  | {
      classification?: {
        types?: Array<{ name?: string | null } | null> | null;
      } | null;
    }
  | null
  | undefined;

export const useRecommendedTypes = (
  allTypes: ProblemTypeItem[],
  summary: SummaryLike
) => {
  return useMemo(() => {
    const aiTypeNames =
      summary?.classification?.types
        ?.map((t) => t?.name)
        .filter(
          (v): v is string => typeof v === "string" && v.trim().length > 0
        ) ?? [];

    const selectedIds: string[] = [];
    const unknownNames: string[] = [];
    const isOnlyNumber = (v: string) => /^\d+$/.test(v);

    aiTypeNames.forEach((name) => {
      const id = findTypeIdByName(allTypes, name);
      if (id) {
        if (!selectedIds.includes(id)) selectedIds.push(id);
        return;
      }

      const cleaned = normalize(name);
      if (!cleaned) return;
      if (isOnlyNumber(cleaned)) return;
      if (!unknownNames.includes(cleaned)) unknownNames.push(cleaned);
    });

    return { selectedIds, unknownNames };
  }, [allTypes, summary]);
};
