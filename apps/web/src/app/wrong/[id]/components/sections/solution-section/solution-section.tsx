"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import * as styles from "./solution-section.css";
import Icon from "@/shared/components/icon/icon";
import MathText from "./math-text";

// "" → "." → ".." → "..." → ".." → "." → "" → ...
const DOTS_SEQUENCE = ["", ".", "..", "...", "..", "."] as const;

interface SolutionSectionProps {
  onAiSolution?: () => void;
  isPending?: boolean;
  solutionText?: string | null;
}

const SolutionSection = ({
  onAiSolution,
  isPending = false,
  solutionText,
}: SolutionSectionProps) => {
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    if (!isPending) return;
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % DOTS_SEQUENCE.length);
    }, 500);
    return () => clearInterval(interval);
  }, [isPending]);

  return (
    <div className={styles.solutionInputWrapper}>
      <div className={styles.container}>
        {solutionText ? (
          <MathText text={solutionText} />
        ) : (
          <div
            className={clsx(
              styles.innerContent,
              isPending && styles.innerContentBlur
            )}
          >
            <div className={styles.titleRow}>
              <span className={styles.titleText}>
                세모랑 같이 문제를 풀어볼까요?
              </span>
            </div>
            <Button
              label="AI 풀이보기"
              size="40-ai"
              tone="ai"
              icon="ai"
              onClick={onAiSolution}
            />
          </div>
        )}
        {isPending && (
          <div className={styles.loadingOverlay}>
            <Icon name="ai-loading" size={4.0} className={styles.rotatingIcon} />
            <span className={styles.loadingText}>
              세모가 문제를 푸는 중이에요{DOTS_SEQUENCE[dotIndex]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionSection;
