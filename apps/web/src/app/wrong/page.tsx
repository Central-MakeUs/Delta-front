"use client";

import { useMemo, useState } from "react";

import * as s from "@/app/wrong/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/components/wrong-card";
import { WRONG_CARDS } from "@/app/wrong/data/wrong-cards";

import BottomSheetSort, {
  type SortOption,
} from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

const SORT_OPTIONS: SortOption[] = [
  { id: "recent", label: "최근 등록순" },
  { id: "oldest", label: "오래된 등록순" },
  { id: "recent-solved", label: "최근 풀이순" },
  { id: "wrongest", label: "오답률 높은순" },
];

const WrongPage = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] = useState(
    SORT_OPTIONS[0]?.id ?? "recent"
  );

  const selectedSortLabel = useMemo(() => {
    return (
      SORT_OPTIONS.find((o) => o.id === selectedSortId)?.label ?? "최근 등록순"
    );
  }, [selectedSortId]);

  const handleOpenSort = () => {
    setIsSortOpen(true);
  };

  const handleCloseSort = () => {
    setIsSortOpen(false);
  };

  const handleSelectSort = (optionId: string) => {
    setSelectedSortId(optionId);
  };

  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter label="필터" icon="filter" />
          <Filter label="단원별" icon="chevron" />
          <Filter label="유형별" icon="chevron" />
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
            onClick={handleOpenSort}
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

      <BottomSheetSort
        isOpen={isSortOpen}
        onClose={handleCloseSort}
        options={SORT_OPTIONS}
        selectedOptionId={selectedSortId}
        onSelect={handleSelectSort}
      />
    </div>
  );
};

export default WrongPage;
