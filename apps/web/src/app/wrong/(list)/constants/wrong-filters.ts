import type {
  BottomSheetFilterProps,
  DropdownSection,
} from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import type { SortOption } from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

import {
  SUBJECTS,
  UNITS,
  PROBLEM_TYPES,
  type SubjectId,
} from "@/shared/constants/math-curriculum";

export type ChapterFilterItem = NonNullable<
  BottomSheetFilterProps["chapterFilters"]
>[number];

export type TypeFilterItem = NonNullable<
  BottomSheetFilterProps["typeFilters"]
>[number];

export const SORT_OPTIONS: SortOption[] = [
  { id: "recent", label: "최근 등록순" },
  { id: "wrong-incomplete", label: "오답 전 문제" },
  { id: "wrong-complete", label: "오답 완료 문제" },
  { id: "type-desc", label: "최다 등록 유형순" },
  { id: "type-asc", label: "최소 등록 유형순" },
];

export const CHAPTER_FILTERS: ChapterFilterItem[] = SUBJECTS.map((s) => ({
  id: s.id,
  label: s.name,
}));

export const TYPE_FILTERS: TypeFilterItem[] = PROBLEM_TYPES.map((t) => ({
  id: t.id,
  label: t.name,
}));

export const CHAPTER_DROPDOWN_OPTIONS = SUBJECTS.reduce<
  Record<string, { id: string; label: string }[]>
>((acc, subject) => {
  acc[subject.id] = UNITS.filter(
    (u) => u.subjectId === (subject.id as SubjectId)
  ).map((u) => ({ id: u.id, label: u.name }));
  return acc;
}, {});

export const DROPDOWN_SECTION: DropdownSection = {
  id: "U_COMMON_2",
  options: CHAPTER_DROPDOWN_OPTIONS["U_COMMON_2"],
  defaultOpen: true,
};

export const allChapterDropdownOptions = Object.values(
  CHAPTER_DROPDOWN_OPTIONS
).flat();
