"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type ToggleValue = "objective" | "subjective";

export type Step4FormState = {
  type: ToggleValue;
  answerChoice: number | null;
  answerText: string;
  solutionText: string;
};

const INITIAL_FORM: Step4FormState = {
  type: "objective",
  answerChoice: null,
  answerText: "",
  solutionText: "",
};

const computeNextEnabled = (form: Step4FormState) => {
  const hasAnswer =
    form.type === "objective"
      ? form.answerChoice !== null
      : form.answerText.trim().length > 0;

  const hasSolution = form.solutionText.trim().length > 0;
  return hasAnswer && hasSolution;
};

export const useStep4Form = (
  onNextEnabledChange?: (enabled: boolean) => void
) => {
  const [form, setForm] = useState<Step4FormState>(INITIAL_FORM);

  const updateForm = useCallback((patch: Partial<Step4FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const isNextEnabled = useMemo(() => computeNextEnabled(form), [form]);

  useEffect(() => {
    onNextEnabledChange?.(isNextEnabled);
  }, [isNextEnabled, onNextEnabledChange]);

  const handleTypeChange = useCallback(
    (nextType: ToggleValue) => {
      updateForm({
        type: nextType,
        answerChoice: null,
        answerText: "",
      });
    },
    [updateForm]
  );

  const handleChoiceChange = useCallback(
    (nextChoice: number) => {
      updateForm({ answerChoice: nextChoice });
    },
    [updateForm]
  );

  const handleAnswerTextChange = useCallback(
    (nextAnswerText: string) => {
      updateForm({ answerText: nextAnswerText });
    },
    [updateForm]
  );

  const handleSolutionChange = useCallback(
    (nextSolution: string) => {
      updateForm({ solutionText: nextSolution });
    },
    [updateForm]
  );

  return {
    form,
    isNextEnabled,
    handlers: {
      handleTypeChange,
      handleChoiceChange,
      handleAnswerTextChange,
      handleSolutionChange,
    },
  };
};
