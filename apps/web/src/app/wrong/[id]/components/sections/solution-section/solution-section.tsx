"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Lottie from "lottie-react";
import { Button } from "@/shared/components/button/button/button";
import * as styles from "./solution-section.css";
import MathText from "./math-text";
import loadingAiLottie from "@/shared/assets/lottie/loading_ai.json";
import Chip from "@/shared/components/chip/chip";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";

const DOTS_SEQUENCE = ["", ".", "..", "...", "..", "."] as const;

interface SolutionSectionProps {
  onAiSolution?: () => void;
  onDeleteSolution?: () => void;
  isPending?: boolean;
  isCompleted?: boolean;
  solutionText?: string | null;
}

const SolutionSection = ({
  onAiSolution,
  onDeleteSolution,
  isPending = false,
  isCompleted = false,
  solutionText,
}: SolutionSectionProps) => {
  const [dotIndex, setDotIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!isPending) return;
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % DOTS_SEQUENCE.length);
    }, 500);
    return () => clearInterval(interval);
  }, [isPending]);

  const handleDeleteConfirm = () => {
    onDeleteSolution?.();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.solutionInputWrapper}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>풀이</span>
        {solutionText && (
          <div
            className={clsx(isCompleted && styles.deleteChipDisabled)}
          >
            <Chip
              icon="trash-chip"
              iconSize={1.6}
              tone="white-gray"
              label="삭제하기"
              size="md"
              shape="pill"
              iconRotate={0}
              state="active"
              disabled={isCompleted}
              onClick={() => !isCompleted && setIsDeleteModalOpen(true)}
            />
          </div>
        )}
      </div>
      <div className={styles.container}>
        {solutionText ? (
          <MathText text={solutionText} className={styles.solutionPlainText} />
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
            <Lottie autoplay loop animationData={loadingAiLottie} />
            <span className={styles.loadingText}>
              세모가 문제를 푸는 중이에요{DOTS_SEQUENCE[dotIndex]}
            </span>
          </div>
        )}
      </div>
      <CompleteModal
        title="풀이를 삭제할까요?"
        description="풀이를 삭제하면 되돌릴 수 없어요."
        cancelLabel="아니요"
        confirmLabel="삭제"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default SolutionSection;
