"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { BottomSheetFilterInitialSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { SORT_OPTIONS } from "@/app/wrong/(list)/constants/wrong-filters";
import {
  getChapterSummaryLabel,
  getTypeSummaryLabel,
} from "@/app/wrong/(list)/utils/wrong-filter-labels";

export type FilterApplyPayload = {
  chapters: string[];
  types: string[];
  dropdown: Record<string, string[]>;
};

const SORT_QUERY_KEY = "sort";
const DEFAULT_SORT_ID = SORT_OPTIONS[0]?.id ?? "recent";

const isValidSortId = (id: string | null): id is string => {
  if (typeof id !== "string") return false;
  return SORT_OPTIONS.some((o) => o.id === id);
};

export const useWrongFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filterInitialSection, setFilterInitialSection] =
    useState<BottomSheetFilterInitialSection>("chapter");

  const selectedSortId = useMemo<string>(() => {
    const q = searchParams.get(SORT_QUERY_KEY);
    return isValidSortId(q) ? q : DEFAULT_SORT_ID;
  }, [searchParams]);

  const setSelectedSortId = (optionId: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (optionId === DEFAULT_SORT_ID) nextParams.delete(SORT_QUERY_KEY);
    else nextParams.set(SORT_QUERY_KEY, optionId);

    const qs = nextParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

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
