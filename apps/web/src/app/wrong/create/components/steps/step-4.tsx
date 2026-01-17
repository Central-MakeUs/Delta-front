"use client";

import Image from "next/image";
import { useEffect } from "react";
import TextField from "@/shared/components/text-field/text-field";
import TextAreaField from "@/shared/components/text-area-field/text-area-field";
import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import { StepProps } from "@/app/wrong/create/page";
import { TOGGLE_OPTIONS } from "@/app/wrong/create/constants/option-labels";
import SampleImg from "@/shared/assets/images/wrong-sample.png";
import * as s from "@/app/wrong/create/components/steps/step.css";
import {
  useStep4Form,
  type ToggleValue,
} from "@/app/wrong/create/hooks/use-step4-form";

const Step4 = ({ onNextEnabledChange }: StepProps) => {
  useEffect(() => {
    onNextEnabledChange?.(true);
  }, [onNextEnabledChange]);
  const { form, handlers } = useStep4Form();

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
              onValueChange={handlers.handleTypeChange}
              options={TOGGLE_OPTIONS}
            />
          </div>

          {form.type === "objective" ? (
            <NumberChoice
              value={form.answerChoice}
              onValueChange={handlers.handleChoiceChange}
            />
          ) : (
            <TextField
              fullWidth
              placeholder="정답을 입력해주세요."
              value={form.answerText}
              onChange={(e) => handlers.handleAnswerTextChange(e.target.value)}
            />
          )}
        </div>

        <div className={s.explanationContent}>
          <span className={s.explanationTitle}>풀이</span>
          <TextAreaField
            fullWidth
            placeholder="풀이를 입력해주세요."
            value={form.solutionText}
            onChange={(e) => handlers.handleSolutionChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
