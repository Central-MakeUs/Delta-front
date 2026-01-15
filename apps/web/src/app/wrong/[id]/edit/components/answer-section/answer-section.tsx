import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import * as styles from "./answer-section.css";

export type QuestionType = "objective" | "subjective";

const TOGGLE_OPTIONS = [
  { value: "objective" as QuestionType, label: "객관식" },
  { value: "subjective" as QuestionType, label: "주관식" },
] as const;

export interface AnswerSectionProps {
  questionType: QuestionType;
  selectedNumber: number | null;
  onQuestionTypeChange: (type: QuestionType) => void;
  onNumberSelect: (value: number) => void;
}

export const AnswerSection = ({
  questionType,
  selectedNumber,
  onQuestionTypeChange,
  onNumberSelect,
}: AnswerSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>정답</h2>
          <div className={styles.toggleWrapper}>
            <Toggle<QuestionType>
              value={questionType}
              onValueChange={onQuestionTypeChange}
              options={TOGGLE_OPTIONS}
              ariaLabel="문제 유형 선택"
            />
          </div>
        </div>
        {questionType === "objective" && (
          <NumberChoice
            count={5}
            value={selectedNumber}
            onValueChange={onNumberSelect}
            className={styles.numberChoice}
          />
        )}
      </div>
    </section>
  );
};

