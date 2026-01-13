"use client";

import { useMemo, useState } from "react";
import type { BottomSheetFilterInitialSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { SORT_OPTIONS } from "@/app/wrong/constants/wrong-filters";
import {
  getChapterSummaryLabel,
  getTypeSummaryLabel,
} from "@/app/wrong/utils/wrong-filter-labels";

export type FilterApplyPayload = {
  chapters: string[];
  types: string[];
  dropdown: Record<string, string[]>;
};

export const useWrongFilters = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filterInitialSection, setFilterInitialSection] =
    useState<BottomSheetFilterInitialSection>("chapter");

  const [selectedSortId, setSelectedSortId] = useState(
    SORT_OPTIONS[0]?.id ?? "recent"
  );

  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([]);
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [selectedDropdownIds, setSelectedDropdownIds] = useState<
    Record<string, string[]>
  >({});

  const selectedSortLabel = useMemo(() => {
    return (
      SORT_OPTIONS.find((o) => o.id === selectedSortId)?.label ?? "최근 등록순"
    );
  }, [selectedSortId]);

  const chapterFilterLabel = useMemo(() => {
    return getChapterSummaryLabel({ selectedChapterIds, selectedDropdownIds });
  }, [selectedChapterIds, selectedDropdownIds]);

  const typeFilterLabel = useMemo(() => {
    return getTypeSummaryLabel(selectedTypeIds);
  }, [selectedTypeIds]);

  const openFilter = (section: BottomSheetFilterInitialSection) => {
    setFilterInitialSection(section);
    setIsFilterOpen(true);
  };

  const closeFilter = () => setIsFilterOpen(false);

  const openSort = () => setIsSortOpen(true);
  const closeSort = () => setIsSortOpen(false);

  const resetFilter = () => {
    setSelectedChapterIds([]);
    setSelectedTypeIds([]);
    setSelectedDropdownIds({});
  };

  const applyFilter = (payload: FilterApplyPayload) => {
    setSelectedChapterIds(payload.chapters);
    setSelectedTypeIds(payload.types);
    setSelectedDropdownIds(payload.dropdown);
  };

  return {
    isSortOpen,
    openSort,
    closeSort,
    isFilterOpen,
    openFilter,
    closeFilter,
    filterInitialSection,
    selectedSortId,
    setSelectedSortId,
    selectedSortLabel,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    chapterFilterLabel,
    typeFilterLabel,
    resetFilter,
    applyFilter,
  };
};
