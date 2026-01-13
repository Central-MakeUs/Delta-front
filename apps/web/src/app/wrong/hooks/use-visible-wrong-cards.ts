"use client";

import { useMemo } from "react";
import type { WrongCardData } from "@/app/wrong/data/wrong-cards";

const toDateNumber = (v: string) => {
  const n = Number(v.replaceAll(".", ""));
  return Number.isFinite(n) ? n : 0;
};

export const useVisibleWrongCards = (params: {
  cards: WrongCardData[];
  selectedChapterIds: string[];
  selectedTypeIds: string[];
  selectedDropdownIds: Record<string, string[]>;
  selectedSortId: string;
}) => {
  const {
    cards,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    selectedSortId,
  } = params;

  return useMemo(() => {
    const filtered = cards.filter((card) => {
      const chapterOk =
        selectedChapterIds.length === 0 ||
        selectedChapterIds.includes(card.chapterId);

      const selectedDropdownForChapter =
        selectedDropdownIds[card.chapterId] ?? [];
      const dropdownOk =
        selectedDropdownForChapter.length === 0 ||
        card.dropdownIds.some((id) => selectedDropdownForChapter.includes(id));

      const typeOk =
        selectedTypeIds.length === 0 ||
        card.typeIds.some((id) => selectedTypeIds.includes(id));

      return chapterOk && dropdownOk && typeOk;
    });

    const statusFiltered =
      selectedSortId === "wrong-incomplete"
        ? filtered.filter((c) => !c.isCompleted)
        : selectedSortId === "wrong-complete"
          ? filtered.filter((c) => c.isCompleted)
          : filtered;

    const byRecentDesc = (
      a: (typeof statusFiltered)[number],
      b: (typeof statusFiltered)[number]
    ) => toDateNumber(b.date) - toDateNumber(a.date);

    if (selectedSortId === "type-desc" || selectedSortId === "type-asc") {
      const counts = statusFiltered.reduce<Record<string, number>>(
        (acc, cur) => {
          cur.typeIds.forEach((id) => {
            acc[id] = (acc[id] ?? 0) + 1;
          });
          return acc;
        },
        {}
      );

      const score = (card: (typeof statusFiltered)[number]) =>
        card.typeIds.reduce((mx, id) => Math.max(mx, counts[id] ?? 0), 0);

      const dir = selectedSortId === "type-desc" ? -1 : 1;

      return [...statusFiltered].sort((a, b) => {
        const diff = (score(a) - score(b)) * dir;
        if (diff !== 0) return diff;
        return byRecentDesc(a, b);
      });
    }

    return [...statusFiltered].sort(byRecentDesc);
  }, [
    cards,
    selectedChapterIds,
    selectedDropdownIds,
    selectedTypeIds,
    selectedSortId,
  ]);
};
