"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useStep3Selection } from "@/app/wrong/create/hooks/use-step-3-selection";
import { usePointerSortIds } from "@/app/wrong/create/hooks/use-pointer-sort-ids";

type Step3Props = StepProps & {
  scanId?: number | string | null;
};

const isSameIds = (a: readonly string[], b: readonly string[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const Step3 = ({ onNextEnabledChange, scanId = null }: Step3Props) => {
  const {
    isTypeLoading,
    viewItems,
    viewSelectedTypeIds,
    suggestedNames,
    addSuggested,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    toggleType,
    removeType,
    updateSortOrder,
  } = useStep3Selection({ scanId, onNextEnabledChange });

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  const customIdsFromServer = useMemo(() => {
    return viewItems.filter((v) => v.custom).map((v) => v.id);
  }, [viewItems]);

  const [customOrderIds, setCustomOrderIds] = useState<string[]>(
    () => customIdsFromServer
  );

  const handlePersistCustomOrder = useCallback(
    async (nextCustomIds: string[]) => {
      const customBySort = viewItems
        .filter((v) => v.custom)
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const sortSlots = customBySort.map((v) => v.sortOrder);
      const currentSortById = new Map(
        customBySort.map((v) => [v.id, v.sortOrder])
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
    [updateSortOrder, viewItems]
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

  const orderedViewItems = useMemo(() => {
    if (customOrderIds.length === 0) return viewItems;

    const customMap = new Map(
      viewItems.filter((v) => v.custom).map((v) => [v.id, v] as const)
    );

    const orderedCustom = customOrderIds
      .map((id) => customMap.get(id))
      .filter(Boolean);

    if (orderedCustom.length === 0) return viewItems;

    const next = viewItems.slice();
    let j = 0;

    for (let i = 0; i < next.length; i += 1) {
      if (!next[i].custom) continue;
      const repl = orderedCustom[j];
      if (repl) next[i] = repl;
      j += 1;
    }

    return next;
  }, [customOrderIds, viewItems]);

  const handleRemove = useCallback(
    async (typeId: string) => {
      if (removingId || isReordering) return;

      setRemovingId(typeId);
      try {
        await removeType(typeId);
      } finally {
        setRemovingId(null);
      }
    },
    [isReordering, removeType, removingId]
  );

  if (isTypeLoading) return null;

  return (
    <div className={s.container}>
      {suggestedNames.length > 0 ? (
        <div className={s.buttonGrid}>
          {suggestedNames.map((name) => (
            <Button
              key={name}
              size="56"
              label={`${name} 추가`}
              tone="surface"
              onClick={() => void addSuggested(name)}
            />
          ))}
        </div>
      ) : null}

      <div className={s.buttonGrid}>
        {orderedViewItems.map((item) => {
          const isSelected = viewSelectedTypeIds.includes(item.id);

          const sortItemProps = item.custom ? getItemProps(item.id) : {};
          const pressProps = item.custom ? getPressProps(item.id) : {};

          return (
            <div
              key={item.id}
              className={clsx(
                s.typeButtonWrap,
                item.custom && s.typeDraggableArea,
                draggingId === item.id && s.typeDragging
              )}
              {...sortItemProps}
              {...pressProps}
              onContextMenuCapture={(e) => {
                if (!item.custom) return;
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Button
                size="56"
                label={item.label}
                tone={isSelected ? "dark" : "surface"}
                aria-pressed={isSelected}
                onClick={() => toggleType(item)}
                className={s.typeButton}
              />

              {item.custom ? (
                <button
                  type="button"
                  className={clsx(
                    s.typeDeleteOverlay,
                    (removingId === item.id || isReordering) &&
                      s.typeOverlayDisabled
                  )}
                  disabled={removingId === item.id || isReordering}
                  aria-label={`${item.label} 삭제`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void handleRemove(item.id);
                  }}
                >
                  ×
                </button>
              ) : null}
            </div>
          );
        })}

        <DirectAddButton
          mode={isAdding ? "input" : "button"}
          value={draft}
          onValueChange={setDraft}
          onSubmit={() => void commitAdd()}
          onCancel={closeAdd}
          onClick={openAdd}
        />
      </div>
    </div>
  );
};

export default Step3;
