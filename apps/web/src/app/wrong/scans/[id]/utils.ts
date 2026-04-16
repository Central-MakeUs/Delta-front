"use client";

import {
  CHAPTER_DROPDOWN_OPTIONS,
  CHAPTER_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import {
  MATH_SUBJECT_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import { matchByLabel, normalize } from "@/app/wrong/create/utils/label-match";

export const dedupe = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean)));

export const reorder = <T,>(values: T[], fromIndex: number, toIndex: number) => {
  const next = values.slice();
  const [moved] = next.splice(fromIndex, 1);
  if (moved === undefined) return values;
  next.splice(toIndex, 0, moved);
  return next;
};

export const isMathSubjectLabel = (
  value: string | null | undefined
): value is MathSubjectLabel => {
  return Boolean(
    value && MATH_SUBJECT_LABELS.includes(value as MathSubjectLabel)
  );
};

export const resolveUnitId = (subjectName: string, unitName: string) => {
  const chapter = matchByLabel(CHAPTER_FILTERS, subjectName);
  if (!chapter) return null;

  const unit = matchByLabel(
    CHAPTER_DROPDOWN_OPTIONS[chapter.id] ?? [],
    unitName
  );
  return unit?.id ?? null;
};

export const resolveKnownTypeIds = (
  typeNames: string[],
  problemTypes: { id: string; name: string }[]
) =>
  dedupe(
    typeNames
      .map(
        (typeName) =>
          problemTypes.find((type) => normalize(type.name) === normalize(typeName))
            ?.id ?? null
      )
      .filter((typeId): typeId is string => Boolean(typeId))
  );
