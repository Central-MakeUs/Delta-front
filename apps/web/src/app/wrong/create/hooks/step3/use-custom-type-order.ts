"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePointerSortIds } from "@/app/wrong/create/hooks/use-pointer-sort-ids";
import { isSameIds } from "@/app/wrong/create/utils/is-same-ids";

type SortableCustomItem = {
  id: string;
  custom: boolean;
  sortOrder: number;
};

type Args<T extends SortableCustomItem> = {
  items: readonly T[];
  updateSortOrder: (typeId: string, sortOrder: number) => Promise<void>;
};

type Return<T extends SortableCustomItem> = {
  orderedItems: readonly T[];
  draggingId: string | null;
  isReordering: boolean;
  getSortableProps: (item: T) => Record<string, unknown>;
};

export const useCustomTypeOrder = <T extends SortableCustomItem>({
  items,
  updateSortOrder,
}: Args<T>): Return<T> => {
  const [isReordering, setIsReordering] = useState(false);

  const customIdsFromServer = useMemo(() => {
    return items.filter((v) => v.custom).map((v) => v.id);
  }, [items]);

  const [customOrderIds, setCustomOrderIds] = useState<string[]>(
    () => customIdsFromServer
  );

  const handlePersistCustomOrder = useCallback(
    async (nextCustomIds: string[]) => {
      const customBySort = items
        .filter((v) => v.custom)
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const sortSlots = customBySort.map((v) => v.sortOrder);
      const currentSortById = new Map(
        customBySort.map((v) => [v.id, v.sortOrder] as const)
      );

      const tasks: Array<Promise<unknown>> = [];

      for (let i = 0; i < nextCustomIds.length; i += 1) {
        const id = nextCustomIds[i];
        const nextSortOrder = sortSlots[i];

        if (nextSortOrder == null) continue;
        if (currentSortById.get(id) === nextSortOrder) continue;

        tasks.push(updateSortOrder(id, nextSortOrder));
      }

      if (tasks.length === 0) return;

      setIsReordering(true);
      try {
        await Promise.all(tasks);
      } finally {
        setIsReordering(false);
      }
    },
    [items, updateSortOrder]
  );

  const { draggingId, getItemProps, getPressProps } = usePointerSortIds({
    ids: customOrderIds,
    onChange: setCustomOrderIds,
    onEnd: handlePersistCustomOrder,
  });

  useEffect(() => {
    if (isReordering) return;
    if (draggingId) return;

    setCustomOrderIds((prev) => {
      if (isSameIds(prev, customIdsFromServer)) return prev;
      return customIdsFromServer;
    });
  }, [customIdsFromServer, draggingId, isReordering]);

  const orderedItems = useMemo(() => {
    if (customOrderIds.length === 0) return items;

    const customMap = new Map(
      items.filter((v) => v.custom).map((v) => [v.id, v] as const)
    );

    const orderedCustom = customOrderIds
      .map((id) => customMap.get(id))
      .filter(Boolean) as T[];

    if (orderedCustom.length === 0) return items;

    const next = items.slice() as T[];
    let j = 0;

    for (let i = 0; i < next.length; i += 1) {
      if (!next[i].custom) continue;
      const repl = orderedCustom[j];
      if (repl) next[i] = repl;
      j += 1;
    }

    return next;
  }, [customOrderIds, items]);

  const getSortableProps = useCallback(
    (item: T) => {
      if (!item.custom) return {};
      return { ...getItemProps(item.id), ...getPressProps(item.id) };
    },
    [getItemProps, getPressProps]
  );

  return { orderedItems, draggingId, isReordering, getSortableProps };
};
