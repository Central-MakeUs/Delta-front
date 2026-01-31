"use client";

import { useCallback } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useStep3Selection } from "@/app/wrong/create/hooks/use-step-3-selection";
import { useCustomTypeOrder } from "@/app/wrong/create/hooks/use-custom-type-order";
import { useAsyncIdLock } from "@/app/wrong/create/hooks/use-async-id-lock";

type Step3Props = StepProps & {
  scanId?: number | string | null;
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

  const { lockedId: removingId, run: runRemove } = useAsyncIdLock();

  const { orderedItems, draggingId, isReordering, getSortableProps } =
    useCustomTypeOrder({
      items: viewItems,
      updateSortOrder,
    });

  const handleRemove = useCallback(
    async (typeId: string) => {
      if (isReordering) return;
      await runRemove(typeId, async () => {
        await removeType(typeId);
      });
    },
    [isReordering, removeType, runRemove]
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
        {orderedItems.map((item) => {
          const isSelected = viewSelectedTypeIds.includes(item.id);
          const sortableProps = getSortableProps(item);

          return (
            <div
              key={item.id}
              className={clsx(
                s.typeButtonWrap,
                item.custom && s.typeDraggableArea,
                draggingId === item.id && s.typeDragging
              )}
              {...sortableProps}
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
