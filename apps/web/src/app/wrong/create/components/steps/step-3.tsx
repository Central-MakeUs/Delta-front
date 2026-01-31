"use client";

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
  } = useStep3Selection({ scanId, onNextEnabledChange });

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
            <Button
              key={item.id}
              size="56"
              label={item.label}
              tone={isSelected ? "dark" : "surface"}
              aria-pressed={isSelected}
              onClick={() => toggleType(item)}
            />
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
