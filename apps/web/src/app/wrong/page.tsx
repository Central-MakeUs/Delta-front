"use client";

import * as s from "@/app/wrong/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/components/wrong-card";
import { WRONG_CARDS } from "@/app/wrong/data/wrong-cards";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import BottomSheetFilter from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import { useVisibleWrongCards } from "@/app/wrong/hooks/use-visible-wrong-cards";

import {
  CHAPTER_FILTERS,
  DROPDOWN_SECTION,
  SORT_OPTIONS,
  TYPE_FILTERS,
} from "@/app/wrong/constants/wrong-filters";
import { useWrongFilters } from "@/app/wrong/hooks/use-wrong-filters";

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

  const visibleCards = useVisibleWrongCards({
    cards: WRONG_CARDS,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    selectedSortId,
  });

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
            <p className={s.wrongCount}>{visibleCards.length}개</p>
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
        {visibleCards.map((card) => (
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
          dropdownSection={DROPDOWN_SECTION}
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
