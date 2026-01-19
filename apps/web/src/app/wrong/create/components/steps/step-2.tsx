"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

const readChapterId = (sp: URLSearchParams) => {
  const raw = sp.get("chapterId");
  if (!raw) return null;
  return raw as ChapterKey;
};

const readUnitId = (sp: URLSearchParams) => {
  const raw = sp.get("unitId");
  return raw ? raw : null;
};

const setParams = (
  base: URLSearchParams,
  patch: Record<string, string | null>
) => {
  const next = new URLSearchParams(base.toString());
  Object.entries(patch).forEach(([k, v]) => {
    if (v === null) next.delete(k);
    else next.set(k, v);
  });
  return next;
};

const Step2 = ({ onNextEnabledChange, scanId = null }: Step2Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const computeEnabled = (
    chapterId: ChapterKey | null,
    unitId: string | null
  ) => Boolean(chapterId && unitId);

  const recommended = useMemo(() => {
    if (!summary) {
      return {
        chapterId: null as ChapterKey | null,
        unitId: null as string | null,
      };
    }

    return computeRecommendation({
      aiSubjectName: summary.classification.subject?.name ?? null,
      aiUnitName: summary.classification.unit?.name ?? null,
    });
  }, [summary]);

  const urlChapterId = useMemo(() => readChapterId(params), [params]);
  const urlUnitId = useMemo(() => readUnitId(params), [params]);

  const [hasUserTouched, setHasUserTouched] = useState(false);

  const [selectedChapterId, setSelectedChapterId] = useState<ChapterKey | null>(
    null
  );
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const viewChapterId = urlChapterId
    ? urlChapterId
    : hasUserTouched
      ? selectedChapterId
      : (recommended.chapterId ?? selectedChapterId);

  const viewUnitId = urlUnitId
    ? urlUnitId
    : hasUserTouched
      ? selectedUnitId
      : (recommended.unitId ?? selectedUnitId);

  const isOpen = viewChapterId !== null;

  useEffect(() => {
    onNextEnabledChange?.(computeEnabled(viewChapterId, viewUnitId));
  }, [onNextEnabledChange, viewChapterId, viewUnitId]);

  useEffect(() => {
    if (urlChapterId || urlUnitId) return;
    if (!recommended.chapterId) return;

    const next = setParams(params, {
      chapterId: recommended.chapterId,
      unitId: recommended.unitId ?? null,
    });

    const nextQuery = next.toString();
    if (nextQuery === spString) return;

    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  }, [
    urlChapterId,
    urlUnitId,
    recommended.chapterId,
    recommended.unitId,
    params,
    pathname,
    router,
    spString,
  ]);

  const pushUrl = (patch: Record<string, string | null>) => {
    const next = setParams(params, patch);
    const nextQuery = next.toString();
    if (nextQuery === spString) return;
    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  };

  const onToggle = (chapterId: ChapterKey) => {
    setHasUserTouched(true);

    const nextChapterId = viewChapterId === chapterId ? null : chapterId;

    setSelectedChapterId(nextChapterId);
    setSelectedUnitId(null);
    onNextEnabledChange?.(false);

    pushUrl({
      chapterId: nextChapterId ? String(nextChapterId) : null,
      unitId: null,
    });
  };

  const onSelectUnit =
    (unitId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setHasUserTouched(true);

      const nextUnitId = e.target.checked ? unitId : null;

      setSelectedChapterId(viewChapterId);
      setSelectedUnitId(nextUnitId);

      onNextEnabledChange?.(computeEnabled(viewChapterId, nextUnitId));

      pushUrl({
        chapterId: viewChapterId ? String(viewChapterId) : null,
        unitId: nextUnitId,
      });
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
