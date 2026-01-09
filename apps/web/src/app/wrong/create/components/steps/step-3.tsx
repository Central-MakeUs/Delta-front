"use client";

import { useMemo, useState } from "react";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "../direct-add-button/direct-add-button";
import * as s from "./step.css";

type Step3TypeProps = {
  onNext: () => void;
  onPrev: () => void;
};

const TYPE_LABELS = [
  "그래프",
  "공통수학2",
  "대수",
  "도형",
  "절댓값",
  "방정식",
] as const;

export const Step3Type = ({
  onNext: _onNext,
  onPrev: _onPrev,
}: Step3TypeProps) => {
  const [labels, setLabels] = useState<string[]>(() => [...TYPE_LABELS]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const normalizedLabels = useMemo(
    () => labels.map((v) => v.trim()).filter(Boolean),
    [labels]
  );

  const openAdd = () => {
    setIsAdding(true);
    setDraft("");
  };

  const closeAdd = () => {
    setIsAdding(false);
    setDraft("");
  };

  const commitAdd = () => {
    const next = draft.trim();
    if (!next) {
      closeAdd();
      return;
    }

    setLabels((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setSelectedLabel(next);
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
            onClick={() => setSelectedLabel(label)}
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
