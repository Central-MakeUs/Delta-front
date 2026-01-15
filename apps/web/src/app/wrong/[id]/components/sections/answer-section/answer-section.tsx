import { useState } from "react";
import Chip from "@/shared/components/chip/chip";
import * as styles from "./answer-section.css";
import Icon from "@/shared/components/icon/icon";

interface AnswerSectionProps {
  answer: string;
  onAnswerRevealed?: () => void;
}

const AnswerSection = ({ answer, onAnswerRevealed }: AnswerSectionProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    onAnswerRevealed?.();
  };

  const handleHideAnswer = () => {
    setShowAnswer(false);
    onAnswerRevealed?.();
  };

  return (
    <div className={styles.answerButtonWrapper}>
      <div className={styles.answerChipWrapper}>
        <div className={styles.answerChipContent}>
          <Chip size="md" shape="pill" label="정답" />
          <span className={styles.answerNumber}>{answer}</span>
        </div>
        {showAnswer && (
          <button
            type="button"
            className={styles.answerChipButton}
            onClick={(e) => {
              handleHideAnswer();
              e.stopPropagation();
            }}
            aria-label="정답 숨기기"
          >
            <Icon name="unlock" size={2.4} />
          </button>
        )}
      </div>
      {!showAnswer && (
        <div className={styles.answerButtonOverlay}>
          <div className={styles.answerButtonContent}>
            <Icon name="lock" size={2.4} />
            <span className={styles.answerButtonText}>
              눌러서 정답을 확인해보세요.
            </span>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleShowAnswer}
        className={
          showAnswer
            ? `${styles.answerToggleButton} ${styles.answerToggleButtonDisabled}`
            : styles.answerToggleButton
        }
        disabled={showAnswer}
        aria-label="정답 확인"
      />
    </div>
  );
};

export default AnswerSection;
