"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ViewTypeItem } from "@/app/wrong/create/hooks/step3/use-active-type-view";

type Args = {
  sanitizedUrlTypeIds: readonly string[];
  recommendedSelectedIds: readonly string[];
  isTypeLoading: boolean;
  params: URLSearchParams;
  spString: string;
  replaceTypeIds: (next: string[]) => void;
  onNextEnabledChange?: (enabled: boolean) => void;
};

export const useSelectedTypeIds = ({
  sanitizedUrlTypeIds,
  recommendedSelectedIds,
  isTypeLoading,
  params,
  spString,
  replaceTypeIds,
  onNextEnabledChange,
}: Args) => {
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [hasUserTouched, setHasUserTouched] = useState(false);

  const viewSelectedTypeIds = useMemo(() => {
    if (sanitizedUrlTypeIds.length > 0) return sanitizedUrlTypeIds;
    if (hasUserTouched) return selectedTypeIds;
    if (recommendedSelectedIds.length > 0) return recommendedSelectedIds;
    return selectedTypeIds;
  }, [
    hasUserTouched,
    recommendedSelectedIds,
    sanitizedUrlTypeIds,
    selectedTypeIds,
  ]);

  useEffect(() => {
    onNextEnabledChange?.(viewSelectedTypeIds.length > 0);
  }, [onNextEnabledChange, viewSelectedTypeIds.length]);

  const didHydrateRef = useRef(false);

  useEffect(() => {
    if (didHydrateRef.current) return;
    if (isTypeLoading) return;

    if (sanitizedUrlTypeIds.length > 0) {
      didHydrateRef.current = true;
      return;
    }

    if (hasUserTouched) {
      didHydrateRef.current = true;
      return;
    }

    if (recommendedSelectedIds.length === 0) return;

    const next = new URLSearchParams(params.toString());
    next.set("typeIds", recommendedSelectedIds.join(","));
    const nextQuery = next.toString();

    if (nextQuery !== spString) replaceTypeIds([...recommendedSelectedIds]);
    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    isTypeLoading,
    params,
    recommendedSelectedIds,
    replaceTypeIds,
    spString,
    sanitizedUrlTypeIds.length,
  ]);

  const commitSelected = useCallback(
    (next: string[], touch: boolean) => {
      if (touch) setHasUserTouched(true);
      setSelectedTypeIds(next);
      replaceTypeIds(next);
      onNextEnabledChange?.(next.length > 0);
    },
    [onNextEnabledChange, replaceTypeIds]
  );

  const toggleType = useCallback(
    (item: ViewTypeItem) => {
      const base = viewSelectedTypeIds;
      const next = base.includes(item.id)
        ? base.filter((id) => id !== item.id)
        : [...base, item.id];
      commitSelected(next, true);
    },
    [commitSelected, viewSelectedTypeIds]
  );

  return { viewSelectedTypeIds, commitSelected, toggleType };
};
