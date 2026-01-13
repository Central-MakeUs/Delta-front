import {
  CHAPTER_FILTERS,
  TYPE_FILTERS,
  allChapterDropdownOptions,
} from "@/app/wrong/(list)/constants/wrong-filters";

const buildLabelMap = (items: { id: string; label: string }[]) =>
  items.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.label;
    return acc;
  }, {});

const CHAPTER_LABEL_BY_ID = buildLabelMap(CHAPTER_FILTERS);
const TYPE_LABEL_BY_ID = buildLabelMap(TYPE_FILTERS);
const DROPDOWN_LABEL_BY_ID = buildLabelMap(allChapterDropdownOptions);

export const getChapterSummaryLabel = (params: {
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

export const getTypeSummaryLabel = (selectedTypeIds: string[]) => {
  if (selectedTypeIds.length === 0) return "유형별";

  const firstId = selectedTypeIds[0];
  const firstLabel = TYPE_LABEL_BY_ID[firstId] ?? "유형별";
  const extraCount = selectedTypeIds.length - 1;

  return extraCount > 0 ? `${firstLabel} 외 ${extraCount}개` : firstLabel;
};
