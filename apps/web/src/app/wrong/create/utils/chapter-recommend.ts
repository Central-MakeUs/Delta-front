import {
  CHAPTER_FILTERS,
  CHAPTER_DROPDOWN_OPTIONS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import { matchByLabel, normalize } from "./label-match";

export type ChapterKey = keyof typeof CHAPTER_DROPDOWN_OPTIONS;
export type UnitOption = { id: string; label: string };

const CHAPTER_KEYS = Object.keys(CHAPTER_DROPDOWN_OPTIONS) as ChapterKey[];

export const getUnitOptions = (chapterId: ChapterKey) =>
  CHAPTER_DROPDOWN_OPTIONS[chapterId] as readonly UnitOption[];

export const findChapterLabelById = (id: ChapterKey | null) => {
  if (!id) return "";
  return CHAPTER_FILTERS.find((v) => v.id === id)?.label ?? "";
};

const findUnitOptionInChapter = (chapterId: ChapterKey, name?: string | null) =>
  matchByLabel<UnitOption>(getUnitOptions(chapterId), name);

const findUnitOptionGlobal = (name?: string | null) => {
  const n = normalize(name);
  if (!n) return null as null | { chapterId: ChapterKey; option: UnitOption };

  for (const chapterId of CHAPTER_KEYS) {
    const options = getUnitOptions(chapterId);
    const hit = matchByLabel<UnitOption>(options, n);
    if (hit) return { chapterId, option: hit };
  }

  return null;
};

export const computeRecommendation = (input: {
  aiSubjectName?: string | null;
  aiUnitName?: string | null;
}) => {
  const { aiSubjectName = null, aiUnitName = null } = input;

  const matchedChapter = matchByLabel(
    CHAPTER_FILTERS as readonly { id: string; label: string }[],
    aiSubjectName
  );

  const chapterIdFromSubject = (matchedChapter?.id ??
    null) as ChapterKey | null;

  let nextChapterId: ChapterKey | null = chapterIdFromSubject;
  let nextUnitId: string | null = null;

  if (nextChapterId) {
    const unitHit = findUnitOptionInChapter(nextChapterId, aiUnitName);
    if (unitHit) {
      nextUnitId = unitHit.id;
    } else {
      const globalHit = findUnitOptionGlobal(aiUnitName);
      if (globalHit) {
        nextChapterId = globalHit.chapterId;
        nextUnitId = globalHit.option.id;
      }
    }
  } else {
    const globalHit = findUnitOptionGlobal(aiUnitName);
    if (globalHit) {
      nextChapterId = globalHit.chapterId;
      nextUnitId = globalHit.option.id;
    }
  }

  return { chapterId: nextChapterId, unitId: nextUnitId };
};
