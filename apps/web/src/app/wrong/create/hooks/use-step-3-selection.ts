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
  viewSelectedTypeIds: readonly string[];
  isAdding: boolean;
  draft: string;
  setDraft: (v: string) => void;
  openAdd: () => void;
  closeAdd: () => void;
  commitAdd: () => void;
  toggleType: (item: TypeItem) => void;
};

const readTypeIds = (sp: URLSearchParams) => {
  const raw = sp.get("typeIds") ?? null;
  if (!raw) return [];

  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

export const useStep3Selection = ({
  scanId,
  onNextEnabledChange,
}: UseStep3SelectionArgs): UseStep3SelectionReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const urlTypeIds = useMemo(() => readTypeIds(params), [params]);

  const [items, setItems] = useState<TypeItem[]>(() =>
    TYPE_FILTERS.map((v) => ({ id: v.id, label: v.label }))
  );

  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [hasUserTouched, setHasUserTouched] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const recommended = useMemo(() => {
    const aiTypeNames =
      summary?.classification.types?.map((t) => t?.name).filter(Boolean) ?? [];

    const selectedIds: string[] = [];
    const extraItems: TypeItem[] = [];

    aiTypeNames.forEach((name) => {
      const rec = computeTypeRecommendation(items, name ?? null);

      if (rec?.selectedId && !selectedIds.includes(rec.selectedId)) {
        selectedIds.push(rec.selectedId);
      }

      if (rec?.extraItem) {
        const exists = extraItems.some(
          (v) =>
            v.id === rec.extraItem!.id ||
            normalizeTypeLabel(v.label) ===
              normalizeTypeLabel(rec.extraItem!.label)
        );
        if (!exists) extraItems.push(rec.extraItem);
      }
    });

    return { selectedIds, extraItems };
  }, [items, summary]);

  const viewItems = useMemo(() => {
    if (hasUserTouched) return items;

    return recommended.extraItems.reduce((acc, extra) => {
      return mergeExtraItem(acc, extra);
    }, items);
  }, [hasUserTouched, items, recommended.extraItems]);

  const viewSelectedTypeIds = useMemo(() => {
    if (urlTypeIds.length > 0) return urlTypeIds;
    if (hasUserTouched) return selectedTypeIds;
    if (recommended.selectedIds.length > 0) return recommended.selectedIds;
    return selectedTypeIds;
  }, [hasUserTouched, recommended.selectedIds, selectedTypeIds, urlTypeIds]);

  useEffect(() => {
    onNextEnabledChange?.(viewSelectedTypeIds.length > 0);
  }, [onNextEnabledChange, viewSelectedTypeIds.length]);

  const didHydrateRef = useRef(false);

  useEffect(() => {
    if (didHydrateRef.current) return;

    if (urlTypeIds.length > 0) {
      didHydrateRef.current = true;
      return;
    }

    if (hasUserTouched) {
      didHydrateRef.current = true;
      return;
    }

    const nextIds = recommended.selectedIds;
    if (nextIds.length === 0) return;

    const nextValue = nextIds.join(",");

    const next = setParams(params, {
      typeIds: nextValue,
    });
    const nextQuery = next.toString();

    if (nextQuery !== spString) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }

    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    urlTypeIds.length,
    recommended.selectedIds,
    params,
    spString,
    pathname,
    router,
  ]);

  const pushTypeIds = useCallback(
    (nextTypeIds: string[]) => {
      const nextValue = nextTypeIds.length > 0 ? nextTypeIds.join(",") : null;

      const next = setParams(params, {
        typeIds: nextValue,
      });
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

  const toggleType = useCallback(
    (item: TypeItem) => {
      setHasUserTouched(true);
      ensureItemInState(item);

      setSelectedTypeIds((prev) => {
        const next = prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id];

        onNextEnabledChange?.(next.length > 0);
        pushTypeIds(next);

        return next;
      });
    },
    [ensureItemInState, onNextEnabledChange, pushTypeIds]
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

    setSelectedTypeIds((prev) => {
      const next = prev.includes(nextItem.id) ? prev : [...prev, nextItem.id];

      onNextEnabledChange?.(next.length > 0);
      pushTypeIds(next);

      return next;
    });

    closeAdd();
  }, [
    closeAdd,
    draft,
    ensureItemInState,
    items,
    onNextEnabledChange,
    pushTypeIds,
  ]);

  return {
    viewItems,
    viewSelectedTypeIds,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    toggleType,
  };
};
