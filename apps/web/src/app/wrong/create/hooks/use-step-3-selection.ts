"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { normalize } from "@/app/wrong/create/utils/label-match";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useSetProblemTypeActiveMutation } from "@/shared/apis/problem-type/hooks/use-set-problem-type-active-mutation";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { useTypeIdsParam } from "@/app/wrong/create/hooks/use-type-ids-param";
import { useOptimisticProblemTypes } from "@/app/wrong/create/hooks/use-optimistic-problem-types";

type UseStep3SelectionArgs = {
  scanId: number | string | null;
  onNextEnabledChange?: (enabled: boolean) => void;
};

export type ViewTypeItem = {
  id: string;
  label: string;
  custom: boolean;
  active: boolean;
  sortOrder: number;
};

export type UseStep3SelectionReturn = {
  isTypeLoading: boolean;
  viewItems: readonly ViewTypeItem[];
  viewSelectedTypeIds: readonly string[];
  suggestedNames: readonly string[];
  addSuggested: (name: string) => Promise<void>;
  isAdding: boolean;
  draft: string;
  setDraft: (v: string) => void;
  openAdd: () => void;
  closeAdd: () => void;
  commitAdd: () => Promise<void>;
  toggleType: (item: ViewTypeItem) => void;
  removeType: (typeId: string) => Promise<void>;
  restoreType: (typeId: string) => Promise<void>;
  renameType: (typeId: string, name: string) => Promise<void>;
  updateSortOrder: (typeId: string, sortOrder: number) => Promise<void>;
};

const normalizeName = (v: string) => normalize(v).toLowerCase();

const findTypeIdByName = (types: ProblemTypeItem[], name: string) => {
  const key = normalizeName(name);
  const hit = types.find((t) => normalizeName(t.name) === key);
  return hit?.id ?? null;
};

export const useStep3Selection = ({
  scanId,
  onNextEnabledChange,
}: UseStep3SelectionArgs): UseStep3SelectionReturn => {
  const { urlTypeIds, replaceTypeIds, params, spString, pathname } =
    useTypeIdsParam();
  const { data: allTypesRaw, isLoading: isTypeLoading } =
    useProblemTypesQuery();
  const allTypes = allTypesRaw ?? [];
  const {
    mergedTypes,
    markInactive,
    unmarkInactive,
    setSortOverride,
    restoreSortOverride,
    sortOverrides,
  } = useOptimisticProblemTypes(allTypes);

  const activeTypes = useMemo(() => {
    return mergedTypes
      .filter((t) => t.active)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [mergedTypes]);

  const viewItems = useMemo<readonly ViewTypeItem[]>(() => {
    return activeTypes.map((t) => ({
      id: t.id,
      label: t.name,
      custom: t.custom,
      active: t.active,
      sortOrder: t.sortOrder,
    }));
  }, [activeTypes]);

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const recommended = useMemo(() => {
    const aiTypeNames =
      summary?.classification.types?.map((t) => t?.name).filter(Boolean) ?? [];

    const selectedIds: string[] = [];
    const unknownNames: string[] = [];

    aiTypeNames.forEach((name) => {
      const id = findTypeIdByName(allTypes, name);
      if (id) {
        if (!selectedIds.includes(id)) selectedIds.push(id);
        return;
      }

      const cleaned = normalize(name);
      if (cleaned && !unknownNames.includes(cleaned))
        unknownNames.push(cleaned);
    });

    return { selectedIds, unknownNames };
  }, [allTypes, summary]);

  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [hasUserTouched, setHasUserTouched] = useState(false);

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
    if (isTypeLoading) return;

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

    const next = new URLSearchParams(params.toString());
    next.set("typeIds", nextIds.join(","));
    const nextQuery = next.toString();

    if (nextQuery !== spString) {
      replaceTypeIds(nextIds);
    }

    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    isTypeLoading,
    params,
    recommended.selectedIds,
    replaceTypeIds,
    spString,
    urlTypeIds.length,
    pathname,
  ]);

  const commitSelected = useCallback(
    (next: string[], touch: boolean) => {
      if (touch) setHasUserTouched(true);
      setSelectedTypeIds(next);
      replaceTypeIds(next);
      onNextEnabledChange?.(next.length > 0);
    },
    [onNextEnabledChange, replaceTypeIds]
  );

  const toggleType = useCallback(
    (item: ViewTypeItem) => {
      const base = viewSelectedTypeIds;
      const next = base.includes(item.id)
        ? base.filter((id) => id !== item.id)
        : [...base, item.id];

      commitSelected(next, true);
    },
    [commitSelected, viewSelectedTypeIds]
  );

  const createMut = useCreateCustomTypeMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const openAdd = useCallback(() => {
    setIsAdding(true);
    setDraft("");
  }, []);

  const closeAdd = useCallback(() => {
    setIsAdding(false);
    setDraft("");
  }, []);

  const commitAdd = useCallback(async () => {
    const nextLabel = normalize(draft);
    if (!nextLabel) {
      closeAdd();
      return;
    }
    const existing = allTypes.find(
      (t) => normalizeName(t.name) === normalizeName(nextLabel)
    );

    if (existing?.id) {
      const base = viewSelectedTypeIds;
      const next = base.includes(existing.id) ? base : [...base, existing.id];
      commitSelected(next, true);
      closeAdd();
      return;
    }

    const created = await createMut.mutateAsync({ name: nextLabel });
    const base = viewSelectedTypeIds;
    const next = base.includes(created.id) ? base : [...base, created.id];

    commitSelected(next, true);
    closeAdd();
  }, [
    allTypes,
    closeAdd,
    commitSelected,
    createMut,
    draft,
    viewSelectedTypeIds,
  ]);

  const addSuggested = useCallback(
    async (name: string) => {
      const cleaned = normalize(name);
      if (!cleaned) return;

      const existing = allTypes.find(
        (t) => normalizeName(t.name) === normalizeName(cleaned)
      );
      const id =
        existing?.id ?? (await createMut.mutateAsync({ name: cleaned })).id;
      const base = viewSelectedTypeIds;
      const next = base.includes(id) ? base : [...base, id];
      commitSelected(next, true);
    },
    [allTypes, commitSelected, createMut, viewSelectedTypeIds]
  );

  const activeMut = useSetProblemTypeActiveMutation();
  const updateMut = useUpdateCustomTypeMutation();

  const removeType = useCallback(
    async (typeId: string) => {
      markInactive(typeId);
      const prevSelected = viewSelectedTypeIds;
      const nextSelected = prevSelected.filter((id) => id !== typeId);
      commitSelected(nextSelected, true);

      try {
        await activeMut.mutateAsync({ typeId, body: { active: false } });
      } catch (e) {
        unmarkInactive(typeId);
        commitSelected(prevSelected, true);
        throw e;
      }
    },
    [
      activeMut,
      commitSelected,
      markInactive,
      unmarkInactive,
      viewSelectedTypeIds,
    ]
  );

  const restoreType = useCallback(
    async (typeId: string) => {
      unmarkInactive(typeId);
      await activeMut.mutateAsync({ typeId, body: { active: true } });
    },
    [activeMut, unmarkInactive]
  );

  const renameType = useCallback(
    async (typeId: string, name: string) => {
      const cleaned = normalize(name);
      if (!cleaned) return;
      await updateMut.mutateAsync({ typeId, body: { name: cleaned } });
    },
    [updateMut]
  );

  const updateSortOrder = useCallback(
    async (typeId: string, sortOrder: number) => {
      const prevOverride = sortOverrides[typeId];
      const prevServer = allTypes.find((t) => t.id === typeId)?.sortOrder;

      setSortOverride(typeId, sortOrder);

      try {
        await updateMut.mutateAsync({ typeId, body: { sortOrder } });
      } catch (e) {
        restoreSortOverride(typeId, prevOverride ?? prevServer);
        throw e;
      }
    },
    [allTypes, restoreSortOverride, setSortOverride, sortOverrides, updateMut]
  );

  return {
    isTypeLoading,
    viewItems,
    viewSelectedTypeIds,
    suggestedNames: recommended.unknownNames,
    addSuggested,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    toggleType,
    removeType,
    restoreType,
    renameType,
    updateSortOrder,
  };
};
