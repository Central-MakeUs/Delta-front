"use client";

import {
  CHAPTER_DROPDOWN_OPTIONS,
  CHAPTER_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import {
  MATH_SUBJECT_LABELS,
  MATH_SUBJECT_TYPE_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import type { WrongCreateGroupItem } from "@/app/wrong/create/utils/group-context";
import type { AnswerMode } from "@/app/wrong/scans/[id]/components/scan-answer-section";
import { matchByLabel, normalize } from "@/app/wrong/create/utils/label-match";
import {
  SUBJECTS,
  UNIT_BY_ID,
  UNITS,
} from "@/shared/constants/math-curriculum";

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

export const getInitialScanState = (
  groupItem: WrongCreateGroupItem | null
): { subject: MathSubjectLabel; unit: string; answerMode: AnswerMode } => {
  const unitById = groupItem?.finalUnitId
    ? UNIT_BY_ID[groupItem.finalUnitId]
    : null;
  const subjectIndex = unitById
    ? SUBJECTS.findIndex((subject) => subject.id === unitById.subjectId)
    : -1;
  const subjectFromId =
    subjectIndex >= 0 ? MATH_SUBJECT_LABELS[subjectIndex] : null;

  if (unitById && subjectFromId) {
    const subjectUnits = UNITS.filter(
      (item) => item.subjectId === unitById.subjectId
    );
    const unitIndex = subjectUnits.findIndex((item) => item.id === unitById.id);
    const unitFromId = MATH_SUBJECT_TYPE_LABELS[subjectFromId][unitIndex];

    return {
      subject: subjectFromId,
      unit: unitFromId ?? MATH_SUBJECT_TYPE_LABELS[subjectFromId][0],
      answerMode:
        groupItem?.answerFormat === "CHOICE" ? "objective" : "subjective",
    };
  }

  const subject = isMathSubjectLabel(groupItem?.subjectName)
    ? groupItem.subjectName
    : MATH_SUBJECT_LABELS[0];
  const units = MATH_SUBJECT_TYPE_LABELS[subject];
  const unitFromName = units.includes((groupItem?.unitName ?? "") as never)
    ? (groupItem?.unitName as (typeof units)[number])
    : units[0];
  const answerMode: AnswerMode =
    groupItem?.answerFormat === "CHOICE" ? "objective" : "subjective";

  return { subject, unit: unitFromName, answerMode };
};

export const resolveUnitId = (subjectName: string, unitName: string) => {
  if (isMathSubjectLabel(subjectName)) {
    const subjectIndex = MATH_SUBJECT_LABELS.indexOf(subjectName);
    const subject = SUBJECTS[subjectIndex];
    const unitIndex = MATH_SUBJECT_TYPE_LABELS[subjectName].findIndex(
      (label) => normalize(label) === normalize(unitName)
    );
    const unit = subject
      ? UNITS.filter((item) => item.subjectId === subject.id)[unitIndex]
      : null;

    if (unit) return unit.id;
  }

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
