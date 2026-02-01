"use client";

import { useMemo } from "react";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { uniqById } from "@/app/wrong/create/utils/uniq-by-id";

export type ViewTypeItem = {
  id: string;
  label: string;
  custom: boolean;
  active: boolean;
  sortOrder: number;
};

export const useActiveTypeView = (mergedTypes: ProblemTypeItem[]) => {
  const activeTypes = useMemo(() => {
    const uniq = uniqById(mergedTypes);
    return uniq
      .filter((t) => t.active)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [mergedTypes]);

  const viewItems = useMemo<readonly ViewTypeItem[]>(() => {
    return activeTypes.map((t) => ({
      id: t.id,
      label: t.name,
      custom: t.custom,
      active: t.active,
      sortOrder: t.sortOrder,
    }));
  }, [activeTypes]);

  const activeIdSet = useMemo(() => {
    return new Set(activeTypes.map((t) => t.id));
  }, [activeTypes]);

  return { activeTypes, viewItems, activeIdSet };
};
