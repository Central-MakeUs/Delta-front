"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";

export const useOptimisticProblemTypes = (allTypes: ProblemTypeItem[]) => {
  const [inactiveIds, setInactiveIds] = useState<Set<string>>(() => new Set());
  const [sortOverrides, setSortOverrides] = useState<Record<string, number>>(
    {}
  );

  const markInactive = useCallback((typeId: string) => {
    setInactiveIds((prev) => {
      const next = new Set(prev);
      next.add(typeId);
      return next;
    });
  }, []);

  const unmarkInactive = useCallback((typeId: string) => {
    setInactiveIds((prev) => {
      const next = new Set(prev);
      next.delete(typeId);
      return next;
    });
  }, []);

  const setSortOverride = useCallback((typeId: string, sortOrder: number) => {
    setSortOverrides((prev) => ({ ...prev, [typeId]: sortOrder }));
  }, []);

  const restoreSortOverride = useCallback(
    (typeId: string, prevValue?: number) => {
      setSortOverrides((prev) => {
        const next = { ...prev };
        if (prevValue == null) delete next[typeId];
        else next[typeId] = prevValue;
        return next;
      });
    },
    []
  );

  const mergedTypes = useMemo(() => {
    if (allTypes.length === 0) return [];
    return allTypes.map((t) => ({
      ...t,
      active: inactiveIds.has(t.id) ? false : t.active,
      sortOrder: sortOverrides[t.id] ?? t.sortOrder,
    }));
  }, [allTypes, inactiveIds, sortOverrides]);

  return {
    mergedTypes,
    markInactive,
    unmarkInactive,
    setSortOverride,
    restoreSortOverride,
    sortOverrides,
  };
};
