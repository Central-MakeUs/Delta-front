"use client";

import { useMemo } from "react";
import * as s from "@/app/wrong/(list)/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/(list)/components/wrong-card";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import BottomSheetFilter from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { useWrongFilters } from "@/app/wrong/(list)/hooks/use-wrong-filters";
import { useProblemListQuery } from "@/shared/apis/problem-list/hooks/use-problem-list-query";
import { mapProblemListItemToCard } from "@/app/wrong/(list)/utils/map-problem-list-to-cards";
import { LOADING_MESSAGES } from "@/shared/constants/loading-messages";
import {
  CHAPTER_FILTERS,
  SORT_OPTIONS,
  TYPE_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import { mapFiltersToApiParams } from "./utils/map-filters-to-params";
import EmptyState from "@/shared/components/empty-state/empty-state";
import Loading from "@/shared/components/loading/loading";

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

  const apiParams = useMemo(
    () =>
      mapFiltersToApiParams({
        selectedChapterIds,
        selectedTypeIds,
        selectedDropdownIds,
        selectedSortId,
      }),
    [selectedChapterIds, selectedTypeIds, selectedDropdownIds, selectedSortId]
  );

  const { data, isLoading, isFetching } = useProblemListQuery({
    params: apiParams,
  });

  const visibleCards = useMemo(() => {
    if (!data?.content) return [];
    return data.content.map(mapProblemListItemToCard);
  }, [data]);

  const showInlineLoading = isLoading || (isFetching && !data);

  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter label="필터" icon="filter" onClick={openFilter} />
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
              {isFetching ? ".." : (data?.totalElements ?? 0)}개
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
        {showInlineLoading ? (
          <Loading
            variant="inline"
            message={LOADING_MESSAGES.FIND_MATCHING_PROBLEMS}
          />
        ) : visibleCards.length === 0 ? (
          <div className={s.emptyStateWrap}>
            <EmptyState
              label={`조건에 맞는 문제가 없어요.\n필터를 다시 설정해주세요.`}
              iconName="filter"
              iconSize={3.6}
              iconWrapperClassName={s.emptyStateIconWrap}
              labelClassName={s.emptyStateText}
            />
          </div>
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
          onSelect={setSelectedSortId}
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
