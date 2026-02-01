"use client";

import { useCallback, useState } from "react";
import { normalize } from "@/app/wrong/create/utils/label-match";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { normalizeTypeName } from "@/app/wrong/create/utils/normalize-type-name";

type Args = {
  allTypes: ProblemTypeItem[];
  viewSelectedTypeIds: readonly string[];
  commitSelected: (next: string[], touch: boolean) => void;
  unmarkInactive: (typeId: string) => void;
  createCustomType: (name: string) => Promise<{ id: string }>;
  setTypeActive: (typeId: string, active: boolean) => Promise<void>;
};

export const useTypeAddFlow = ({
  allTypes,
  viewSelectedTypeIds,
  commitSelected,
  unmarkInactive,
  createCustomType,
  setTypeActive,
}: Args) => {
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

  const ensureSelected = useCallback(
    (typeId: string) => {
      const base = viewSelectedTypeIds;
      const next = base.includes(typeId) ? [...base] : [...base, typeId];
      commitSelected(next, true);
    },
    [commitSelected, viewSelectedTypeIds]
  );

  const upsertByName = useCallback(
    async (name: string) => {
      const cleaned = normalize(name);
      if (!cleaned) return;

      const existing = allTypes.find(
        (t) => normalizeTypeName(t.name) === normalizeTypeName(cleaned)
      );

      if (existing?.id) {
        if (!existing.active) await setTypeActive(existing.id, true);
        unmarkInactive(existing.id);
        ensureSelected(existing.id);
        return;
      }

      const created = await createCustomType(cleaned);
      unmarkInactive(created.id);
      ensureSelected(created.id);
    },
    [allTypes, createCustomType, ensureSelected, setTypeActive, unmarkInactive]
  );

  const commitAdd = useCallback(async () => {
    await upsertByName(draft);
    closeAdd();
  }, [closeAdd, draft, upsertByName]);

  const addSuggested = useCallback(
    async (name: string) => {
      await upsertByName(name);
    },
    [upsertByName]
  );

  return {
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    addSuggested,
  };
};
