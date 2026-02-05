"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { normalizeDropdownIds } from "@/shared/components/bottom-sheet/bottom-sheet-filter/utils/normalize-dropdown-ids";

const isSameStringArray = (a: string[], b: string[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const isSameDropdownMap = (
  a: Record<string, string[]>,
  b: Record<string, string[]>
) => {
  if (a === b) return true;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  const bKeySet = new Set(bKeys);
  for (const k of aKeys) {
    if (!bKeySet.has(k)) return false;
    const av = a[k] ?? [];
    const bv = b[k] ?? [];
    if (!isSameStringArray(av, bv)) return false;
  }

  return true;
};

export const useSyncedFilterState = (params: {
  selectedChapterIds: string[];
  selectedTypeIds: string[];
  selectedDropdownIds: NonNullable<
    BottomSheetFilterProps["selectedDropdownIds"]
  >;
}) => {
  const { selectedChapterIds, selectedTypeIds, selectedDropdownIds } = params;

  const [localChapterIds, setLocalChapterIds] =
    useState<string[]>(selectedChapterIds);
  const [localTypeIds, setLocalTypeIds] = useState<string[]>(selectedTypeIds);
  const [localDropdownIds, setLocalDropdownIds] = useState<
    Record<string, string[]>
  >(() => normalizeDropdownIds(selectedDropdownIds));

  const latestSelectedChapterIdsRef = useRef(selectedChapterIds);
  const latestSelectedTypeIdsRef = useRef(selectedTypeIds);
  const latestSelectedDropdownIdsRef = useRef(selectedDropdownIds);

  useEffect(() => {
    latestSelectedChapterIdsRef.current = selectedChapterIds;
    latestSelectedTypeIdsRef.current = selectedTypeIds;
    latestSelectedDropdownIdsRef.current = selectedDropdownIds;
  }, [selectedChapterIds, selectedTypeIds, selectedDropdownIds]);

  const syncFromLatest = useCallback(() => {
    const nextChapters = latestSelectedChapterIdsRef.current;
    const nextTypes = latestSelectedTypeIdsRef.current;
    const nextDropdown = normalizeDropdownIds(
      latestSelectedDropdownIdsRef.current
    );

    setLocalChapterIds((prev) => (prev === nextChapters ? prev : nextChapters));
    setLocalTypeIds((prev) => (prev === nextTypes ? prev : nextTypes));
    setLocalDropdownIds((prev) =>
      isSameDropdownMap(prev, nextDropdown) ? prev : nextDropdown
    );
  }, []);

  return {
    localChapterIds,
    setLocalChapterIds,
    localTypeIds,
    setLocalTypeIds,
    localDropdownIds,
    setLocalDropdownIds,
    syncFromLatest,
  };
};
