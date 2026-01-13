"use client";

import { useEffect, useRef, useState } from "react";
import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";
import { normalizeDropdownIds } from "@/shared/components/bottom-sheet/bottom-sheet-filter/utils/normalize-dropdown-ids";

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

  const syncFromLatest = () => {
    setLocalChapterIds(latestSelectedChapterIdsRef.current);
    setLocalTypeIds(latestSelectedTypeIdsRef.current);
    setLocalDropdownIds(
      normalizeDropdownIds(latestSelectedDropdownIdsRef.current)
    );
  };

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
