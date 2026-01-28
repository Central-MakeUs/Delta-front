"use client";

import { ProblemSection } from "../problem-section/problem-section";
import { AnswerSection } from "../answer-section/answer-section";
import { SolutionSection } from "../solution-section/solution-section";
import { Button } from "@/shared/components/button/button/button";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import { useWrongEditForm } from "../../hooks/use-wrong-edit-form";
import * as styles from "./wrong-edit-form.css";

export const WrongEditForm = () => {
  const {
    sectionData,
    isLoading,
    isError,
    questionType,
    selectedNumber,
    answerText,
    solution,
    isCompleteModalOpen,
    handleQuestionTypeChange,
    handleNumberSelect,
    handleAnswerChange,
    setSolution,
    openCompleteModal,
    closeCompleteModal,
    handleComplete,
    isPending,
  } = useWrongEditForm();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !sectionData) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <ProblemSection {...sectionData} />
        <AnswerSection
          {...sectionData}
          questionType={questionType}
          answerChoice={selectedNumber}
          answerText={answerText}
          onQuestionTypeChange={handleQuestionTypeChange}
          onNumberSelect={handleNumberSelect}
          onAnswerChange={handleAnswerChange}
        />
        <SolutionSection solution={solution} onSolutionChange={setSolution} />
      </div>

      <div className={styles.bottomButtonContainer}>
        <div className={styles.bottomButtonWrapper}>
          <Button
            fullWidth
            onClick={openCompleteModal}
            tone="dark"
            label="수정 완료"
            size="48"
            disabled={isPending}
          />
        </div>
      </div>

      <CompleteModal
        title="수정을 완료할까요?"
        description="입력한 풀이는 저장되며, 수정이 완료 처리돼요."
        cancelLabel="아니요"
        confirmLabel={isPending ? "처리 중..." : "완료"}
        isOpen={isCompleteModalOpen}
        onClose={closeCompleteModal}
        onConfirm={handleComplete}
      />
    </div>
  );
};
