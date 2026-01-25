"use client";

import { useMemo } from "react";
import * as s from "@/app/wrong/(list)/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/(list)/components/wrong-card";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import BottomSheetFilter from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { useWrongFilters } from "@/app/wrong/(list)/hooks/use-wrong-filters";
import { useProblemListQuery } from "@/shared/apis/problem-list/hooks/use-problem-list-query";
import type { GetProblemListParams } from "@/shared/apis/problem-list/problem-list-types";
import { mapProblemListItemToCard } from "@/app/wrong/(list)/utils/map-problem-list-to-cards";

import {
  CHAPTER_FILTERS,
  SORT_OPTIONS,
  TYPE_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";

const WrongPage = () => {
  const {
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
  } = useWrongFilters();

  const apiParams = useMemo<GetProblemListParams>(() => {
    const params: GetProblemListParams = {
      page: 0,
      size: 20, // 기본 페이지 크기
    };

    if (selectedChapterIds.length > 0) {
      params.subjectId = selectedChapterIds[0];
    }

    const firstDropdownValue = Object.values(selectedDropdownIds).flat()[0];
    if (firstDropdownValue) {
      params.unitId = firstDropdownValue;
    }

    if (selectedTypeIds.length > 0) {
      params.typeId = selectedTypeIds[0];
    }

    switch (selectedSortId) {
      case "recent":
        params.sort = "RECENT";
        params.status = "ALL";
        break;
      case "wrong-incomplete":
        params.sort = "RECENT";
        params.status = "UNSOLVED";
        break;
      case "wrong-complete":
        params.sort = "RECENT";
        params.status = "SOLVED";
        break;
      case "type-desc":
        params.sort = "TYPE_MOST";
        params.status = "ALL";
        break;
      case "type-asc":
        params.sort = "TYPE_LEAST";
        params.status = "ALL";
        break;
      default:
        params.sort = "RECENT";
        params.status = "ALL";
    }

    return params;
  }, [
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    selectedSortId,
  ]);

  const { data, isLoading } = useProblemListQuery({
    params: apiParams,
  });

  const visibleCards = useMemo(() => {
    if (!data?.content) return [];
    return data.content.map(mapProblemListItemToCard);
  }, [data]);
  console.log(visibleCards);
  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter
            label="필터"
            icon="filter"
            onClick={() => openFilter("chapter")}
          />
          <Filter
            label={chapterFilterLabel}
            icon="chevron"
            onClick={() => openFilter("chapter")}
          />
          <Filter
            label={typeFilterLabel}
            icon="chevron"
            onClick={() => openFilter("type")}
          />
        </div>

        <div className={s.sortRow}>
          <span className={s.wrongLabel}>
            <p className={s.wrongCount}>
              {isLoading ? "..." : (data?.totalElements ?? 0)}개
            </p>
            <p>의 오답</p>
          </span>

          <Filter
            icon="chevron"
            label={selectedSortLabel}
            background="transparent"
            onClick={openSort}
          />
        </div>
      </div>

      <div className={s.cardSection}>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : visibleCards.length === 0 ? (
          <div>오답카드가 없습니다.</div>
        ) : (
          visibleCards.map((card) => (
            <WrongCard
              key={card.id}
              title={card.title}
              date={card.date}
              imageSrc={card.imageSrc}
              imageAlt="오답 문제 이미지"
              chips={card.chips}
              href={card.href}
              isCompleted={card.isCompleted}
            />
          ))
        )}
      </div>

      {isSortOpen && (
        <BottomSheetSort
          isOpen={isSortOpen}
          onClose={closeSort}
          options={SORT_OPTIONS}
          selectedOptionId={selectedSortId}
          onSelect={(optionId) => setSelectedSortId(optionId)}
        />
      )}

      {isFilterOpen && (
        <BottomSheetFilter
          isOpen={isFilterOpen}
          onClose={closeFilter}
          chapterFilters={CHAPTER_FILTERS}
          typeFilters={TYPE_FILTERS}
          selectedChapterIds={selectedChapterIds}
          selectedTypeIds={selectedTypeIds}
          selectedDropdownIds={selectedDropdownIds}
          onReset={resetFilter}
          onApply={applyFilter}
          initialSection={filterInitialSection}
        />
      )}
    </div>
  );
};

export default WrongPage;
