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
  type BottomSheetFilterInitialSection,
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
  { id: "wrong-incomplete", label: "오답 전 문제" },
  { id: "wrong-complete", label: "오답 완료 문제" },
  { id: "type-desc", label: "최다 등록 유형순" },
  { id: "type-asc", label: "최소 등록 유형순" },
];

const CHAPTER_FILTERS: ChapterFilterItem[] = [
  { id: "common-math-1", label: "공통수학1" },
  { id: "common-math-2", label: "공통수학2" },
  { id: "algebra", label: "대수" },
  { id: "calculus-1", label: "미적분I" },
  { id: "probability-statistics", label: "확률과 통계" },
  { id: "calculus-2", label: "미적분II" },
  { id: "geometry", label: "기하" },
];

const TYPE_FILTERS: TypeFilterItem[] = [
  { id: "graph", label: "그래프" },
  { id: "common-math-2", label: "공통수학2" },
  { id: "algebra", label: "대수" },
  { id: "geometry", label: "도형" },
  { id: "absolute-value", label: "절댓값" },
  { id: "equation", label: "방정식" },
];

const CHAPTER_DROPDOWN_OPTIONS = {
  "common-math-1": [
    { id: "polynomial", label: "다항식" },
    { id: "equation-inequality", label: "방정식과 부등식" },
    { id: "permutation-combination", label: "경우의 수" },
    { id: "matrix", label: "행렬" },
  ],
  "common-math-2": [
    { id: "shapes", label: "도형의 방정식" },
    { id: "set-proposition", label: "집합과 명제" },
    { id: "function-graph", label: "함수와 그래프" },
  ],
  algebra: [
    { id: "exponent-log", label: "지수함수와 로그함수" },
    { id: "trigonometric", label: "삼각함수" },
    { id: "sequence", label: "수열" },
  ],
  "calculus-1": [
    { id: "limit-continuity", label: "함수의 극한과 연속" },
    { id: "differentiation", label: "미분" },
    { id: "integration", label: "적분" },
  ],
  "probability-statistics": [
    { id: "counting", label: "순열과 조합" },
    { id: "probability", label: "확률" },
    { id: "statistics", label: "통계" },
  ],
  "calculus-2": [
    { id: "sequence-limit", label: "수열의 극한" },
    { id: "differentiation-method", label: "미분법" },
    { id: "integration-method", label: "적분법" },
  ],
  geometry: [
    { id: "conic-section", label: "이차곡선" },
    { id: "vector", label: "평면벡터" },
    { id: "space-figure", label: "공간도형과 공간좌표" },
  ],
} as const;

const DROPDOWN_SECTION: DropdownSection = {
  id: "common-math-2",
  options: CHAPTER_DROPDOWN_OPTIONS["common-math-2"],
  defaultOpen: true,
};

const buildLabelMap = (items: { id: string; label: string }[]) =>
  items.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.label;
    return acc;
  }, {});

const CHAPTER_LABEL_BY_ID = buildLabelMap(CHAPTER_FILTERS);
const TYPE_LABEL_BY_ID = buildLabelMap(TYPE_FILTERS);
const allChapters = Object.values(CHAPTER_DROPDOWN_OPTIONS).flat();
const DROPDOWN_LABEL_BY_ID = buildLabelMap(allChapters);

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
            onClick={() => {
              setFilterInitialSection("chapter");
              setIsFilterOpen(true);
            }}
          />
          <Filter
            label={chapterFilterLabel}
            icon="chevron"
            onClick={() => {
              setFilterInitialSection("chapter");
              setIsFilterOpen(true);
            }}
          />
          <Filter
            label={typeFilterLabel}
            icon="chevron"
            onClick={() => {
              setFilterInitialSection("type");
              setIsFilterOpen(true);
            }}
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
          initialSection={filterInitialSection} // ✅ 핵심
        />
      )}
    </div>
  );
};

export default WrongPage;
