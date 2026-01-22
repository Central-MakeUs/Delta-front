"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import {
  type ChapterKey,
  type UnitOption,
  computeRecommendation,
  findChapterLabelById,
  getUnitOptions,
} from "@/app/wrong/create/utils/chapter-recommend";
import { setParams } from "@/app/wrong/create/utils/url-params";

type UseStep2SelectionArgs = {
  scanId: number | string | null;
  onNextEnabledChange?: (enabled: boolean) => void;
};

type UseStep2SelectionReturn = {
  viewChapterId: ChapterKey | null;
  viewUnitId: string | null;
  isOpen: boolean;
  unitOptions: readonly UnitOption[];
  chapterLabel: string;
  onToggle: (chapterId: ChapterKey) => void;
  onSelectUnit: (unitId: string) => (e: ChangeEvent<HTMLInputElement>) => void;
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

export const useStep2Selection = ({
  scanId,
  onNextEnabledChange,
}: UseStep2SelectionArgs): UseStep2SelectionReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const computeEnabled = useCallback(
    (chapterId: ChapterKey | null, unitId: string | null) =>
      Boolean(chapterId && unitId),
    []
  );

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
  }, [computeEnabled, onNextEnabledChange, viewChapterId, viewUnitId]);

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

  const pushUrl = useCallback(
    (patch: Record<string, string | null>) => {
      const next = setParams(params, patch);
      const nextQuery = next.toString();
      if (nextQuery === spString) return;

      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    },
    [params, pathname, router, spString]
  );

  const onToggle = useCallback(
    (chapterId: ChapterKey) => {
      setHasUserTouched(true);

      const nextChapterId = viewChapterId === chapterId ? null : chapterId;

      setSelectedChapterId(nextChapterId);
      setSelectedUnitId(null);
      onNextEnabledChange?.(false);

      pushUrl({
        chapterId: nextChapterId ? String(nextChapterId) : null,
        unitId: null,
      });
    },
    [onNextEnabledChange, pushUrl, viewChapterId]
  );

  const onSelectUnit = useCallback(
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
    },
    [computeEnabled, onNextEnabledChange, pushUrl, viewChapterId]
  );

  const unitOptions: readonly UnitOption[] = useMemo(() => {
    return viewChapterId ? getUnitOptions(viewChapterId) : [];
  }, [viewChapterId]);

  const chapterLabel = useMemo(() => {
    return findChapterLabelById(viewChapterId) ?? "";
  }, [viewChapterId]);

  return {
    viewChapterId,
    viewUnitId,
    isOpen,
    unitOptions,
    chapterLabel,
    onToggle,
    onSelectUnit,
  };
};
