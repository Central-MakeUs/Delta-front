"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import * as styles from "./wrong-detail-content.css";
import {
  HeaderSection,
  QuestionSection,
  AnswerSection,
  SolutionSection,
} from "@/app/wrong/[id]/components/sections";
import { BottomButton } from "@/app/wrong/[id]/components/actions";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import { useProblemDetailQuery } from "@/shared/apis/problem-detail/hooks/use-problem-detail-query";
import { useCompleteProblemDetailMutation } from "@/shared/apis/problem-detail/hooks/use-complete-problem-detail-mutation";
import { mapProblemDetailToSectionData } from "../utils/map-problem-detail-to-section-data";
import type { WrongDetailSectionData } from "../types";
import EmptyState from "@/shared/components/empty-state/empty-state";

const WrongDetailContent = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useProblemDetailQuery(id);
  const completeMutation = useCompleteProblemDetailMutation();

  const initialSolution = useMemo(() => {
    return data?.completed && data.solutionText ? data.solutionText : "";
  }, [data?.completed, data?.solutionText]);

  const [solution, setSolution] = useState(initialSolution);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const sectionData = useMemo<WrongDetailSectionData | null>(() => {
    if (!data) return null;
    return mapProblemDetailToSectionData(data);
  }, [data]);

  if (isLoading) return null;
  if (isError || !data || !sectionData) {
    return (
      <EmptyState
        label="잠시 문제가 발생했어요. 다시 한번 시도해주세요."
        iconName="empty-problem"
        labelClassName={styles.emptyStateLabel}
      />
    );
  }

  const handleConfirm = () => {
    setIsCompleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCompleteModalOpen(false);
  };

  const handleComplete = async () => {
    await completeMutation.mutateAsync({
      problemId: id,
      solutionText: solution,
    });
    setIsCompleteModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <HeaderSection {...sectionData} />

          <QuestionSection {...sectionData} />

          <div className={styles.inputSection}>
            <div className={styles.inputContent}>
              <AnswerSection {...sectionData} />
              <SolutionSection
                value={solution}
                onChange={setSolution}
                disabled={data.completed}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomButton
        onClick={handleConfirm}
        disabled={!solution.trim() || data.completed}
        isCompleted={data.completed}
      />

      <CompleteModal
        title="오답을 완료할까요?"
        description="입력한 풀이는 저장되며, 오답이 완료 처리돼요."
        cancelLabel="아니요"
        confirmLabel="완료"
        isOpen={isCompleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleComplete}
      />
    </div>
  );
};

export default WrongDetailContent;
