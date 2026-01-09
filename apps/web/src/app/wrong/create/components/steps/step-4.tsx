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

  const handleTypeChange = (next: ToggleValue) => {
    setType(next);
    setAnswerChoice(null);
    setAnswerText("");
    onNextEnabledChange?.(false);
  };

  const handleChoiceChange = (next: number) => {
    setAnswerChoice(next);
    onNextEnabledChange?.(true);
  };

  const handleAnswerTextChange = (next: string) => {
    setAnswerText(next);
    onNextEnabledChange?.(next.trim().length > 0);
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
          <TextAreaField fullWidth placeholder="풀이를 입력해주세요." />
        </div>
      </div>
    </div>
  );
};

export default Step4;
