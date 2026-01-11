"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import TextField from "@/shared/components/text-field/text-field";
import TextAreaField from "@/shared/components/text-area-field/text-area-field";
import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import { StepProps } from "@/app/wrong/create/page";
import { TOGGLE_OPTIONS } from "@/app/wrong/create/constants/option-labels";
import SampleImg from "@/shared/assets/images/wrong-sample.png";
import * as s from "@/app/wrong/create/components/steps/step.css";

type ToggleValue = "objective" | "subjective";

type FormState = {
  type: ToggleValue;
  answerChoice: number | null;
  answerText: string;
  solutionText: string;
};

const Step4 = ({ onNextEnabledChange }: StepProps) => {
  const [form, setForm] = useState<FormState>({
    type: "objective",
    answerChoice: null,
    answerText: "",
    solutionText: "",
  });

  const updateForm = useCallback((patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const isNextEnabled = useMemo(() => {
    const hasAnswer =
      form.type === "objective"
        ? form.answerChoice !== null
        : form.answerText.trim().length > 0;

    const hasSolution = form.solutionText.trim().length > 0;

    return hasAnswer && hasSolution;
  }, [form]);

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

  return (
    <div className={s.step4Container}>
      <Image
        src={SampleImg}
        alt="문제 이미지 샘플"
        width={SampleImg.width}
        height={SampleImg.height}
        className={s.image}
        priority
      />

      <div className={s.explanationSection}>
        <div className={s.explanationContent}>
          <div className={s.numberTitleRow}>
            <span className={s.explanationTitle}>정답</span>

            <Toggle<ToggleValue>
              value={form.type}
              onValueChange={handleTypeChange}
              options={TOGGLE_OPTIONS}
            />
          </div>

          {form.type === "objective" ? (
            <NumberChoice
              value={form.answerChoice}
              onValueChange={handleChoiceChange}
            />
          ) : (
            <TextField
              fullWidth
              placeholder="정답을 입력해주세요."
              value={form.answerText}
              onChange={(e) => handleAnswerTextChange(e.target.value)}
            />
          )}
        </div>

        <div className={s.explanationContent}>
          <span className={s.explanationTitle}>풀이</span>
          <TextAreaField
            fullWidth
            placeholder="풀이를 입력해주세요."
            value={form.solutionText}
            onChange={(e) => handleSolutionChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
