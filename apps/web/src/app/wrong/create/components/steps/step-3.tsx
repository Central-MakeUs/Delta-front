"use client";

import { useState } from "react";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import { StepProps } from "@/app/wrong/create/page";
import { WRONG_TYPE_LABELS } from "@/app/wrong/create/constants/option-labels";

export const Step3Type = ({ onNextEnabledChange }: StepProps) => {
  const [labels, setLabels] = useState<string[]>(() => [...WRONG_TYPE_LABELS]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const normalizedLabels = labels.map((v) => v.trim()).filter(Boolean);

  const openAdd = () => {
    setIsAdding(true);
    setDraft("");
  };

  const closeAdd = () => {
    setIsAdding(false);
    setDraft("");
  };

  const selectLabel = (label: string) => {
    setSelectedLabel(label);
    onNextEnabledChange?.(true);
  };

  const commitAdd = () => {
    const next = draft.trim();
    if (!next) {
      closeAdd();
      return;
    }

    setLabels((prev) => (prev.includes(next) ? prev : [...prev, next]));
    selectLabel(next);
    closeAdd();
  };

  return (
    <div className={s.container}>
      <div className={s.buttonGrid}>
        {normalizedLabels.map((label) => (
          <Button
            key={label}
            size="56"
            label={label}
            tone={selectedLabel === label ? "dark" : "surface"}
            aria-pressed={selectedLabel === label}
            onClick={() => selectLabel(label)}
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

export default Step3Type;
