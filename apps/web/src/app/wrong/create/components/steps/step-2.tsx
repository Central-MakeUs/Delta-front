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
import { CHAPTER_FILTERS } from "@/app/wrong/(list)/constants/wrong-filters";
import {
  type ChapterKey,
  type UnitOption,
  computeRecommendation,
  findChapterLabelById,
  getUnitOptions,
} from "@/app/wrong/create/utils/chapter-recommend";

type Step2Props = StepProps & {
  scanId?: number | string | null;
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

    return computeRecommendation({
      aiSubjectName: summary.classification.subject?.name ?? null,
      aiUnitName: summary.classification.unit?.name ?? null,
    });
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
