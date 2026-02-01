"use client";

import { useEffect, useMemo } from "react";

export const useSanitizedUrlTypeIds = (
  urlTypeIds: readonly string[],
  activeIdSet: ReadonlySet<string>,
  isTypeLoading: boolean,
  replaceTypeIds: (next: string[]) => void
) => {
  const sanitizedUrlTypeIds = useMemo(() => {
    return urlTypeIds.filter((id) => activeIdSet.has(id));
  }, [activeIdSet, urlTypeIds]);

  useEffect(() => {
    if (isTypeLoading) return;

    const prev = urlTypeIds.join(",");
    const next = sanitizedUrlTypeIds.join(",");
    if (prev === next) return;

    replaceTypeIds([...sanitizedUrlTypeIds]);
  }, [isTypeLoading, replaceTypeIds, sanitizedUrlTypeIds, urlTypeIds]);

  return { sanitizedUrlTypeIds };
};
