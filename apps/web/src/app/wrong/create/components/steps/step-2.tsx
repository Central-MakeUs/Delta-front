"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

import {
  CHAPTER_FILTERS,
  CHAPTER_DROPDOWN_OPTIONS,
} from "@/app/wrong/(list)/constants/wrong-filters";

type Step2Props = StepProps & {
  scanId?: number | string | null;
};

type ChapterKey = keyof typeof CHAPTER_DROPDOWN_OPTIONS;
type UnitOption = { id: string; label: string };

const normalize = (v?: string | null) => (v ?? "").trim();

const matchByLabel = <T extends { label: string }>(
  items: readonly T[],
  name?: string | null
) => {
  const n = normalize(name);
  if (!n) return null;

  return (
    items.find((v) => v.label === n) ??
    items.find((v) => n.includes(v.label) || v.label.includes(n)) ??
    null
  );
};

const CHAPTER_KEYS = Object.keys(CHAPTER_DROPDOWN_OPTIONS) as ChapterKey[];

const getUnitOptions = (chapterId: ChapterKey) =>
  CHAPTER_DROPDOWN_OPTIONS[chapterId] as readonly UnitOption[];

const findChapterLabelById = (id: ChapterKey | null) => {
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

const Step2 = ({ onNextEnabledChange, scanId = null }: Step2Props) => {
  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const computeEnabled = (
    chapterId: ChapterKey | null,
    unitId: string | null
  ) => Boolean(chapterId && unitId);

  const recommended = useMemo(() => {
    if (!summary)
      return {
        chapterId: null as ChapterKey | null,
        unitId: null as string | null,
      };

    const aiSubjectName = summary.classification.subject?.name ?? null;
    const aiUnitName = summary.classification.unit?.name ?? null;

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
  }, [summary]);

  const [hasUserTouched, setHasUserTouched] = useState(false);

  const [selectedChapterId, setSelectedChapterId] = useState<ChapterKey | null>(
    null
  );
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const viewChapterId = hasUserTouched
    ? selectedChapterId
    : (recommended.chapterId ?? selectedChapterId);

  const viewUnitId = hasUserTouched
    ? selectedUnitId
    : (recommended.unitId ?? selectedUnitId);

  const isOpen = viewChapterId !== null;

  useEffect(() => {
    onNextEnabledChange?.(computeEnabled(viewChapterId, viewUnitId));
  }, [onNextEnabledChange, viewChapterId, viewUnitId]);

  const onToggle = (chapterId: ChapterKey) => {
    setHasUserTouched(true);

    const nextChapterId = viewChapterId === chapterId ? null : chapterId;
    setSelectedChapterId(nextChapterId);
    setSelectedUnitId(null);
    onNextEnabledChange?.(false);
  };

  const onSelectUnit =
    (unitId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setHasUserTouched(true);

      const nextUnitId = e.target.checked ? unitId : null;

      setSelectedChapterId(viewChapterId);
      setSelectedUnitId(nextUnitId);
      onNextEnabledChange?.(computeEnabled(viewChapterId, nextUnitId));
    };

  const unitOptions: readonly UnitOption[] = viewChapterId
    ? getUnitOptions(viewChapterId)
    : [];

  const chapterLabel = findChapterLabelById(viewChapterId);

  return (
    <div className={s.container}>
      <div className={s.chipGrid}>
        {CHAPTER_FILTERS.map((chapter) => {
          const chapterId = chapter.id as ChapterKey;

          return (
            <Chip
              key={chapter.id}
              fullWidth={true}
              shape="pill"
              label={chapter.label}
              state={viewChapterId === chapterId ? "active" : "default"}
              onClick={() => onToggle(chapterId)}
            />
          );
        })}
      </div>

      <div className={s.dividerReveal({ open: isOpen })}>
        <Divider />
      </div>

      <div className={s.checkReveal({ open: isOpen })}>
        <div className={s.checkSection}>
          <div className={s.checkTitleSection}>
            <Icon name="triangle" size={2} className={s.icon} />
            <p className={s.checkTitle}>{chapterLabel}</p>
          </div>

          <div className={s.checkList}>
            {unitOptions.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.label}
                checked={viewUnitId === opt.id}
                onChange={onSelectUnit(opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
