import { useState } from "react";
import Image from "next/image";
import Chip from "@/shared/components/chip/chip";
import * as styles from "./answer-section.css";

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
            <Image
              src="/wrong-detail/unlock.svg"
              alt="정답 숨기기"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      {!showAnswer && (
        <div className={styles.answerButtonOverlay}>
          <div className={styles.answerButtonContent}>
            <Image
              src="/wrong-detail/lock.svg"
              alt="정답 확인"
              width={24}
              height={24}
            />
            <span className={styles.answerButtonText}>
              눌러서 정답을 확인해보세요.
            </span>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleShowAnswer}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          background: "transparent",
          border: "none",
          cursor: showAnswer ? "default" : "pointer",
          zIndex: showAnswer ? 0 : 2,
        }}
        disabled={showAnswer}
        aria-label="정답 확인"
      />
    </div>
  );
};

export default AnswerSection;
