"use client";

import { useState } from "react";
import TextField from "@/shared/components/text-field/text-field";
import Image from "next/image";
import * as s from "@/app/wrong/create/components/steps/step.css";
import SampleImg from "@/shared/assets/images/wrong-sample.png";
import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import TextAreaField from "@/shared/components/text-area-field/text-area-field";
import { StepProps } from "@/app/wrong/create/page";
import { TOGGLE_OPTIONS } from "@/app/wrong/create/constants/option-labels";

type ToggleValue = "objective" | "subjective";

const Step4 = ({ onNextEnabledChange }: StepProps) => {
  const [type, setType] = useState<ToggleValue>("objective");
  const [answerChoice, setAnswerChoice] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [solutionText, setSolutionText] = useState("");

  const computeEnabled = (next: {
    type: ToggleValue;
    answerChoice: number | null;
    answerText: string;
    solutionText: string;
  }) => {
    const hasAnswer =
      next.type === "objective"
        ? next.answerChoice !== null
        : next.answerText.trim().length > 0;

    const hasSolution = next.solutionText.trim().length > 0;

    return hasAnswer && hasSolution;
  };

  const handleTypeChange = (nextType: ToggleValue) => {
    setType(nextType);
    setAnswerChoice(null);
    setAnswerText("");

    const nextState = {
      type: nextType,
      answerChoice: null,
      answerText: "",
      solutionText,
    };
    onNextEnabledChange?.(computeEnabled(nextState));
  };

  const handleChoiceChange = (nextChoice: number) => {
    setAnswerChoice(nextChoice);

    const nextState = {
      type,
      answerChoice: nextChoice,
      answerText,
      solutionText,
    };
    onNextEnabledChange?.(computeEnabled(nextState));
  };

  const handleAnswerTextChange = (nextAnswerText: string) => {
    setAnswerText(nextAnswerText);

    const nextState = {
      type,
      answerChoice,
      answerText: nextAnswerText,
      solutionText,
    };
    onNextEnabledChange?.(computeEnabled(nextState));
  };

  const handleSolutionChange = (nextSolution: string) => {
    setSolutionText(nextSolution);

    const nextState = {
      type,
      answerChoice,
      answerText,
      solutionText: nextSolution,
    };
    onNextEnabledChange?.(computeEnabled(nextState));
  };

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
              value={type}
              onValueChange={handleTypeChange}
              options={TOGGLE_OPTIONS}
            />
          </div>

          {type === "objective" ? (
            <NumberChoice
              value={answerChoice}
              onValueChange={handleChoiceChange}
            />
          ) : (
            <TextField
              fullWidth
              placeholder="정답을 입력해주세요."
              value={answerText}
              onChange={(e) => handleAnswerTextChange(e.target.value)}
            />
          )}
        </div>

        <div className={s.explanationContent}>
          <span className={s.explanationTitle}>풀이</span>
          <TextAreaField
            fullWidth
            placeholder="풀이를 입력해주세요."
            value={solutionText}
            onChange={(e) => handleSolutionChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
