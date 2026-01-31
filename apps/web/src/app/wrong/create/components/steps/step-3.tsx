"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useStep3Selection } from "@/app/wrong/create/hooks/use-step-3-selection";

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
  } = useStep3Selection({ scanId, onNextEnabledChange });

  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = useCallback(
    async (typeId: string) => {
      if (removingId) return;
      setRemovingId(typeId);
      try {
        await removeType(typeId);
      } finally {
        setRemovingId(null);
      }
    },
    [removeType, removingId]
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
        {viewItems.map((item) => {
          const isSelected = viewSelectedTypeIds.includes(item.id);

          return (
            <div key={item.id} className={s.typeButtonWrap}>
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
                    removingId === item.id && s.typeDeleteOverlayDisabled
                  )}
                  disabled={removingId === item.id}
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
