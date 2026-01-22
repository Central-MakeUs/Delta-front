"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { TYPE_FILTERS } from "@/app/wrong/(list)/constants/wrong-filters";
import { normalize } from "@/app/wrong/create/utils/label-match";
import { setParams } from "@/app/wrong/create/utils/url-params";
import {
  type TypeItem,
  computeTypeRecommendation,
  mergeExtraItem,
  normalizeTypeLabel,
  toKebabId,
} from "@/app/wrong/create/utils/type-recommend";

type UseStep3SelectionArgs = {
  scanId: number | string | null;
  onNextEnabledChange?: (enabled: boolean) => void;
};

type UseStep3SelectionReturn = {
  viewItems: readonly TypeItem[];
  viewSelectedTypeId: string | null;

  isAdding: boolean;
  draft: string;
  setDraft: (v: string) => void;

  openAdd: () => void;
  closeAdd: () => void;
  commitAdd: () => void;

  selectType: (item: TypeItem) => void;
};

const readTypeId = (sp: URLSearchParams) => sp.get("typeId") ?? null;

export const useStep3Selection = ({
  scanId,
  onNextEnabledChange,
}: UseStep3SelectionArgs): UseStep3SelectionReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const urlTypeId = useMemo(() => readTypeId(params), [params]);

  const [items, setItems] = useState<TypeItem[]>(() =>
    TYPE_FILTERS.map((v) => ({ id: v.id, label: v.label }))
  );

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [hasUserTouched, setHasUserTouched] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const recommended = useMemo(() => {
    const aiTypeName = summary?.classification.type?.name ?? null;
    return computeTypeRecommendation(items, aiTypeName);
  }, [items, summary]);

  const viewItems = useMemo(() => {
    if (hasUserTouched) return items;
    return mergeExtraItem(items, recommended?.extraItem);
  }, [hasUserTouched, items, recommended]);

  const viewSelectedTypeId = urlTypeId
    ? urlTypeId
    : hasUserTouched
      ? selectedTypeId
      : (recommended?.selectedId ?? selectedTypeId);

  useEffect(() => {
    onNextEnabledChange?.(Boolean(viewSelectedTypeId));
  }, [onNextEnabledChange, viewSelectedTypeId]);

  const didHydrateRef = useRef(false);

  useEffect(() => {
    if (didHydrateRef.current) return;

    if (urlTypeId) {
      didHydrateRef.current = true;
      return;
    }

    if (hasUserTouched) {
      didHydrateRef.current = true;
      return;
    }

    const nextId = recommended?.selectedId ?? null;
    if (!nextId) return;

    const next = setParams(params, { typeId: nextId });
    const nextQuery = next.toString();

    if (nextQuery !== spString) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }

    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    urlTypeId,
    recommended?.selectedId,
    params,
    spString,
    pathname,
    router,
  ]);

  const pushTypeId = useCallback(
    (nextTypeId: string | null) => {
      const next = setParams(params, { typeId: nextTypeId });
      const nextQuery = next.toString();
      if (nextQuery === spString) return;

      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    },
    [params, pathname, router, spString]
  );

  const openAdd = useCallback(() => {
    setIsAdding(true);
    setDraft("");
  }, []);

  const closeAdd = useCallback(() => {
    setIsAdding(false);
    setDraft("");
  }, []);

  const ensureItemInState = useCallback((item: TypeItem) => {
    setItems((prev) => {
      const exists = prev.some(
        (v) =>
          v.id === item.id ||
          normalizeTypeLabel(v.label) === normalizeTypeLabel(item.label)
      );

      return exists ? prev : [...prev, item];
    });
  }, []);

  const selectType = useCallback(
    (item: TypeItem) => {
      setHasUserTouched(true);
      ensureItemInState(item);
      setSelectedTypeId(item.id);
      onNextEnabledChange?.(true);
      pushTypeId(item.id);
    },
    [ensureItemInState, onNextEnabledChange, pushTypeId]
  );

  const commitAdd = useCallback(() => {
    const nextLabel = normalize(draft);

    if (!nextLabel) {
      closeAdd();
      return;
    }

    setHasUserTouched(true);

    const existing = items.find(
      (v) => normalizeTypeLabel(v.label) === normalizeTypeLabel(nextLabel)
    );

    const nextItem: TypeItem = existing ?? {
      id: toKebabId(nextLabel),
      label: nextLabel,
    };

    ensureItemInState(nextItem);
    setSelectedTypeId(nextItem.id);
    onNextEnabledChange?.(true);
    pushTypeId(nextItem.id);

    closeAdd();
  }, [
    closeAdd,
    draft,
    ensureItemInState,
    items,
    onNextEnabledChange,
    pushTypeId,
  ]);

  return {
    viewItems,
    viewSelectedTypeId,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    selectType,
  };
};
