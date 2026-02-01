"use client";

import { useCallback } from "react";
import { normalize } from "@/app/wrong/create/utils/label-match";

type UpdateTypeBody =
  | { name: string; sortOrder?: never }
  | { sortOrder: number; name?: never };

type Args = {
  allTypes: { id: string; sortOrder: number }[];
  viewSelectedTypeIds: readonly string[];
  commitSelected: (next: string[], touch: boolean) => void;
  markInactive: (typeId: string) => void;
  unmarkInactive: (typeId: string) => void;
  setSortOverride: (typeId: string, sortOrder: number) => void;
  restoreSortOverride: (typeId: string, sortOrder: number | undefined) => void;
  sortOverrides: Record<string, number | undefined>;
  setTypeActive: (typeId: string, active: boolean) => Promise<void>;
  updateType: (typeId: string, body: UpdateTypeBody) => Promise<void>;
};

export const useTypeMaintenance = ({
  allTypes,
  viewSelectedTypeIds,
  commitSelected,
  markInactive,
  unmarkInactive,
  setSortOverride,
  restoreSortOverride,
  sortOverrides,
  setTypeActive,
  updateType,
}: Args) => {
  const removeType = useCallback(
    async (typeId: string) => {
      markInactive(typeId);

      const prevSelected = [...viewSelectedTypeIds];
      const nextSelected = prevSelected.filter((id) => id !== typeId);
      commitSelected(nextSelected, true);

      try {
        await setTypeActive(typeId, false);
      } catch (e) {
        unmarkInactive(typeId);
        commitSelected(prevSelected, true);
        throw e;
      }
    },
    [
      commitSelected,
      markInactive,
      setTypeActive,
      unmarkInactive,
      viewSelectedTypeIds,
    ]
  );

  const restoreType = useCallback(
    async (typeId: string) => {
      unmarkInactive(typeId);
      await setTypeActive(typeId, true);
    },
    [setTypeActive, unmarkInactive]
  );

  const renameType = useCallback(
    async (typeId: string, name: string) => {
      const cleaned = normalize(name);
      if (!cleaned) return;
      await updateType(typeId, { name: cleaned });
    },
    [updateType]
  );

  const updateSortOrder = useCallback(
    async (typeId: string, sortOrder: number) => {
      const prevOverride = sortOverrides[typeId];
      const prevServer = allTypes.find((t) => t.id === typeId)?.sortOrder;

      setSortOverride(typeId, sortOrder);

      try {
        await updateType(typeId, { sortOrder });
      } catch (e) {
        restoreSortOverride(typeId, prevOverride ?? prevServer);
        throw e;
      }
    },
    [allTypes, restoreSortOverride, setSortOverride, sortOverrides, updateType]
  );

  return { removeType, restoreType, renameType, updateSortOrder };
};
