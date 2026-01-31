"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { setParams } from "@/app/wrong/create/utils/url-params";
import { normalize } from "@/app/wrong/create/utils/label-match";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useSetProblemTypeActiveMutation } from "@/shared/apis/problem-type/hooks/use-set-problem-type-active-mutation";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";

type UseStep3SelectionArgs = {
  scanId: number | string | null;
  onNextEnabledChange?: (enabled: boolean) => void;
};

type ViewTypeItem = {
  id: string;
  label: string;
  custom: boolean;
  active: boolean;
  sortOrder: number;
};

type UseStep3SelectionReturn = {
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

const readTypeIds = (sp: URLSearchParams) => {
  const raw = sp.get("typeIds") ?? null;
  if (!raw) return [];

  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
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
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);
  const urlTypeIds = useMemo(() => readTypeIds(params), [params]);

  const { data: allTypesRaw, isLoading: isTypeLoading } =
    useProblemTypesQuery();
  const allTypes = allTypesRaw ?? [];

  const activeTypes = useMemo(() => {
    return allTypes
      .filter((t) => t.active)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [allTypes]);

  const viewItems = useMemo<readonly ViewTypeItem[]>(() => {
    return activeTypes.map((t) => ({
      id: t.id,
      label: t.name,
      custom: t.custom,
      active: t.active,
      sortOrder: t.sortOrder,
    }));
  }, [activeTypes]);

  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [hasUserTouched, setHasUserTouched] = useState(false);

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
      } else {
        const cleaned = normalize(name);
        if (cleaned && !unknownNames.includes(cleaned))
          unknownNames.push(cleaned);
      }
    });

    return { selectedIds, unknownNames };
  }, [allTypes, summary]);

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

    const next = setParams(params, { typeIds: nextIds.join(",") });
    const nextQuery = next.toString();

    if (nextQuery !== spString) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }

    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    isTypeLoading,
    params,
    pathname,
    recommended.selectedIds,
    router,
    spString,
    urlTypeIds.length,
  ]);

  const pushTypeIds = useCallback(
    (nextTypeIds: string[]) => {
      const nextValue = nextTypeIds.length > 0 ? nextTypeIds.join(",") : null;

      const next = setParams(params, { typeIds: nextValue });
      const nextQuery = next.toString();
      if (nextQuery === spString) return;

      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    },
    [params, pathname, router, spString]
  );

  const toggleType = useCallback(
    (item: ViewTypeItem) => {
      setHasUserTouched(true);

      const base = viewSelectedTypeIds;
      const next = base.includes(item.id)
        ? base.filter((id) => id !== item.id)
        : [...base, item.id];

      setSelectedTypeIds(next);
      pushTypeIds(next);
      onNextEnabledChange?.(next.length > 0);
    },
    [onNextEnabledChange, pushTypeIds, viewSelectedTypeIds]
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

    const nextId = existing?.id ?? null;

    if (nextId) {
      const base = viewSelectedTypeIds;
      const next = base.includes(nextId) ? base : [...base, nextId];

      setHasUserTouched(true);
      setSelectedTypeIds(next);
      pushTypeIds(next);
      onNextEnabledChange?.(next.length > 0);

      closeAdd();
      return;
    }

    try {
      const created = await createMut.mutateAsync({ name: nextLabel });

      const base = viewSelectedTypeIds;
      const next = base.includes(created.id) ? base : [...base, created.id];

      setHasUserTouched(true);
      setSelectedTypeIds(next);
      pushTypeIds(next);
      onNextEnabledChange?.(next.length > 0);

      closeAdd();
    } catch (e) {
      throw e;
    }
  }, [
    allTypes,
    closeAdd,
    createMut,
    draft,
    onNextEnabledChange,
    pushTypeIds,
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

      setHasUserTouched(true);
      setSelectedTypeIds(next);
      pushTypeIds(next);
      onNextEnabledChange?.(next.length > 0);
    },
    [allTypes, createMut, onNextEnabledChange, pushTypeIds, viewSelectedTypeIds]
  );

  const activeMut = useSetProblemTypeActiveMutation();
  const updateMut = useUpdateCustomTypeMutation();

  const removeType = useCallback(
    async (typeId: string) => {
      await activeMut.mutateAsync({ typeId, body: { active: false } });

      const base = viewSelectedTypeIds;
      const next = base.filter((id) => id !== typeId);

      setSelectedTypeIds(next);
      pushTypeIds(next);
      onNextEnabledChange?.(next.length > 0);
    },
    [activeMut, onNextEnabledChange, pushTypeIds, viewSelectedTypeIds]
  );

  const restoreType = useCallback(
    async (typeId: string) => {
      await activeMut.mutateAsync({ typeId, body: { active: true } });
    },
    [activeMut]
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
      await updateMut.mutateAsync({ typeId, body: { sortOrder } });
    },
    [updateMut]
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
