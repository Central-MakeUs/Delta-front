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
    viewItems,
    viewSelectedTypeId,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    selectType,
  } = useStep3Selection({ scanId, onNextEnabledChange });

  return (
    <div className={s.container}>
      <div className={s.buttonGrid}>
        {viewItems.map((item) => (
          <Button
            key={item.id}
            size="56"
            label={item.label}
            tone={viewSelectedTypeId === item.id ? "dark" : "surface"}
            aria-pressed={viewSelectedTypeId === item.id}
            onClick={() => selectType(item)}
          />
        ))}

        <DirectAddButton
          mode={isAdding ? "input" : "button"}
          value={draft}
          onValueChange={setDraft}
          onSubmit={commitAdd}
          onCancel={closeAdd}
          onClick={openAdd}
        />
      </div>
    </div>
  );
};

export default Step3;
