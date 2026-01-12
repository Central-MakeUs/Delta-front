"use client";

import { useMemo, useState } from "react";

import * as s from "@/app/wrong/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/components/wrong-card";
import { WRONG_CARDS } from "@/app/wrong/data/wrong-cards";

import BottomSheetSort, {
  type SortOption,
} from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

import BottomSheetFilter, {
  type BottomSheetFilterProps,
  type DropdownSection,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";

type ChapterFilterItem = NonNullable<
  BottomSheetFilterProps["chapterFilters"]
>[number];
type TypeFilterItem = NonNullable<
  BottomSheetFilterProps["typeFilters"]
>[number];

type FilterApplyPayload = {
  chapters: string[];
  types: string[];
  dropdown: Record<string, string[]>;
};

const SORT_OPTIONS: SortOption[] = [
  { id: "recent", label: "최근 등록순" },
  { id: "oldest", label: "오래된 등록순" },
  { id: "recent-solved", label: "최근 풀이순" },
  { id: "wrongest", label: "오답률 높은순" },
];

const CHAPTER_FILTERS: ChapterFilterItem[] = [
  { id: "common-math", label: "공통수학" },
  { id: "calculus", label: "미적분" },
  { id: "geometry", label: "기하" },
];

const TYPE_FILTERS: TypeFilterItem[] = [
  { id: "graph", label: "그래프" },
  { id: "equation", label: "방정식" },
  { id: "concept", label: "개념" },
  { id: "calculation", label: "계산" },
];

const CHAPTER_DROPDOWN_OPTIONS = {
  "common-math": [
    { id: "polynomial", label: "다항식" },
    { id: "absolute", label: "절댓값" },
    { id: "function", label: "함수" },
  ],
} as const;

const DROPDOWN_SECTION: DropdownSection = {
  parentId: "common-math",
  options: CHAPTER_DROPDOWN_OPTIONS["common-math"],
};

const buildLabelMap = (items: { id: string; label: string }[]) =>
  items.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.label;
    return acc;
  }, {});

const CHAPTER_LABEL_BY_ID = buildLabelMap(CHAPTER_FILTERS);
const TYPE_LABEL_BY_ID = buildLabelMap(TYPE_FILTERS);
const DROPDOWN_LABEL_BY_ID = buildLabelMap(
  CHAPTER_DROPDOWN_OPTIONS["common-math"].slice()
);

const getChapterSummaryLabel = (params: {
  selectedChapterIds: string[];
  selectedDropdownIds: Record<string, string[]>;
}) => {
  const { selectedChapterIds, selectedDropdownIds } = params;

  if (selectedChapterIds.length === 0) return "단원별";

  const flattened: Array<{ chapterId: string; dropdownId?: string }> = [];

  selectedChapterIds.forEach((chapterId) => {
    const dropdownIds = selectedDropdownIds[chapterId] ?? [];

    if (dropdownIds.length === 0) {
      flattened.push({ chapterId });
      return;
    }

    dropdownIds.forEach((dropdownId) =>
      flattened.push({ chapterId, dropdownId })
    );
  });

  const first = flattened[0];
  if (!first) return "단원별";

  const chapterLabel = CHAPTER_LABEL_BY_ID[first.chapterId] ?? "단원별";
  const dropdownLabel = first.dropdownId
    ? (DROPDOWN_LABEL_BY_ID[first.dropdownId] ?? "")
    : "";

  const base = dropdownLabel
    ? `${chapterLabel}-${dropdownLabel}`
    : chapterLabel;
  const extraCount = flattened.length - 1;

  return extraCount > 0 ? `${base} 외 ${extraCount}개` : base;
};

const getTypeSummaryLabel = (selectedTypeIds: string[]) => {
  if (selectedTypeIds.length === 0) return "유형별";

  const firstId = selectedTypeIds[0];
  const firstLabel = TYPE_LABEL_BY_ID[firstId] ?? "유형별";
  const extraCount = selectedTypeIds.length - 1;

  return extraCount > 0 ? `${firstLabel} 외 ${extraCount}개` : firstLabel;
};

const WrongPage = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleResetFilter = () => {
    setSelectedChapterIds([]);
    setSelectedTypeIds([]);
    setSelectedDropdownIds({});
  };

  const handleApplyFilter = (payload: FilterApplyPayload) => {
    setSelectedChapterIds(payload.chapters);
    setSelectedTypeIds(payload.types);
    setSelectedDropdownIds(payload.dropdown);
  };

  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter
            label="필터"
            icon="filter"
            onClick={() => setIsFilterOpen(true)}
          />
          <Filter
            label={chapterFilterLabel}
            icon="chevron"
            onClick={() => setIsFilterOpen(true)}
          />
          <Filter
            label={typeFilterLabel}
            icon="chevron"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>

        <div className={s.sortRow}>
          <span className={s.wrongLabel}>
            <p className={s.wrongCount}>{WRONG_CARDS.length}개</p>
            <p>의 오답</p>
          </span>

          <Filter
            icon="chevron"
            label={selectedSortLabel}
            background="transparent"
            onClick={() => setIsSortOpen(true)}
          />
        </div>
      </div>

      <div className={s.cardSection}>
        {WRONG_CARDS.map((card) => (
          <WrongCard
            key={card.id}
            title={card.title}
            date={card.date}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            chips={card.chips}
            href={card.href}
          />
        ))}
      </div>

      {isSortOpen && (
        <BottomSheetSort
          isOpen={isSortOpen}
          onClose={() => setIsSortOpen(false)}
          options={SORT_OPTIONS}
          selectedOptionId={selectedSortId}
          onSelect={(optionId) => setSelectedSortId(optionId)}
        />
      )}

      {isFilterOpen && (
        <BottomSheetFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          chapterFilters={CHAPTER_FILTERS}
          typeFilters={TYPE_FILTERS}
          dropdownSection={DROPDOWN_SECTION}
          selectedChapterIds={selectedChapterIds}
          selectedTypeIds={selectedTypeIds}
          selectedDropdownIds={selectedDropdownIds}
          onReset={handleResetFilter}
          onApply={handleApplyFilter}
        />
      )}
    </div>
  );
};

export default WrongPage;
