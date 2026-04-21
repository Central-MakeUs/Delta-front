"use client";

import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import TextField from "@/shared/components/text-field/text-field";
import { Toggle } from "@/shared/components/toggle/toggle";
import { TOGGLE_OPTIONS } from "@/app/wrong/create/constants/option-labels";
import * as s from "@/app/wrong/scans/[id]/page.css";

export type AnswerMode = "objective" | "subjective";

type ScanAnswerSectionProps = {
  answerMode: AnswerMode;
  answerChoice: number | null;
  answerText: string;
  onAnswerModeChange: (value: AnswerMode) => void;
  onAnswerChoiceChange: (value: number | null) => void;
  onAnswerTextChange: (value: string) => void;
};

const ScanAnswerSection = ({
  answerMode,
  answerChoice,
  answerText,
  onAnswerModeChange,
  onAnswerChoiceChange,
  onAnswerTextChange,
}: ScanAnswerSectionProps) => {
  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>정답</div>
        <Toggle
          value={answerMode}
          onValueChange={(value) => onAnswerModeChange(value as AnswerMode)}
          options={TOGGLE_OPTIONS}
        />
      </div>

      {answerMode === "objective" ? (
        <NumberChoice
          value={answerChoice}
          onValueChange={onAnswerChoiceChange}
        />
      ) : (
        <TextField
          value={answerText}
          onChange={(event) => onAnswerTextChange(event.target.value)}
          placeholder="정답을 입력해 주세요."
          fullWidth
        />
      )}
    </div>
  );
};

export default ScanAnswerSection;
