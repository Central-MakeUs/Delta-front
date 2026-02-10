"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import clsx from "clsx";
import * as s from "@/app/wrong/(list)/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/(list)/components/wrong-card";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import BottomSheetFilter from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { useWrongFilters } from "@/app/wrong/(list)/hooks/use-wrong-filters";
import { useProblemScrollInfiniteQuery } from "@/shared/apis/problem-list/hooks/use-problem-scroll-infinite-query";
import { mapProblemListItemToCard } from "@/app/wrong/(list)/utils/map-problem-list-to-cards";
import { LOADING_MESSAGES } from "@/shared/constants/loading-messages";
import Chip from "@/shared/components/chip/chip";

import {
  CHAPTER_FILTERS,
  SORT_OPTIONS,
  TYPE_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import { mapFiltersToScrollParams } from "./utils/map-filters-to-params";
import EmptyState from "@/shared/components/empty-state/empty-state";
import Loading from "@/shared/components/loading/loading";

const SCROLL_THRESHOLD_PX = 400;

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

  const scrollParams = useMemo(
    () =>
      mapFiltersToScrollParams({
        selectedChapterIds,
        selectedTypeIds,
        selectedDropdownIds,
        selectedSortId,
      }),
    [selectedChapterIds, selectedTypeIds, selectedDropdownIds, selectedSortId]
  );

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProblemScrollInfiniteQuery({ params: scrollParams });
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetchingNextRef = useRef(false);

  useEffect(() => {
    isFetchingNextRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextRef.current)
          fetchNextPage();
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const visibleCards = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.content.map(mapProblemListItemToCard)
    );
  }, [data]);

  const totalElements = data?.pages?.[0]?.totalElements ?? 0;

  useEffect(() => {
    const onScroll = () => {
      setShowScrollToTop(
        visibleCards.length >= 2 && window.scrollY > SCROLL_THRESHOLD_PX
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCards.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showInlineLoading = isLoading || (isFetchingNextPage && !data);

  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter label="필터" icon="filter" onClick={() => openFilter()} />
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
            <p className={s.wrongCount}>{isLoading ? "0" : totalElements}개</p>
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
          <>
            {visibleCards.map((card) => (
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
            ))}
            {hasNextPage && (
              <div ref={sentinelRef} className={s.scrollSentinel} aria-hidden />
            )}
            {isFetchingNextPage && (
              <Loading
                variant="inline"
                message={LOADING_MESSAGES.FIND_MATCHING_PROBLEMS}
              />
            )}
          </>
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

      {visibleCards.length >= 2 && (
        <div
          className={clsx(
            s.scrollToTopWrap,
            showScrollToTop && s.scrollToTopWrapVisible
          )}
        >
          <Chip
            label="위로 올라가기"
            icon="arrow-right"
            size="lg"
            shape="pill"
            tone="white-surface"
            state="active"
            onClick={scrollToTop}
            ariaLabel="목록 맨 위로 스크롤"
          />
        </div>
      )}
    </div>
  );
};

export default WrongPage;
