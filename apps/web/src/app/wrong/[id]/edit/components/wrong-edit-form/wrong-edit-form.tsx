"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ProblemSection } from "../problem-section/problem-section";
import {
  AnswerSection,
  type QuestionType,
} from "../answer-section/answer-section";
import { SolutionSection } from "../solution-section/solution-section";
import * as styles from "./wrong-edit-form.css";
import { getWrongDetailDataById } from "../../../components/mocks/wrong-dummy";
import { Button } from "@/shared/components/button/button/button";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import { useRouter } from "next/navigation";

export const WrongEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const data = getWrongDetailDataById(id);

  // 데이터에서 초기값 가져오기
  const initialQuestionType = useMemo(
    () => data?.questionType || "objective",
    [data]
  );
  const initialAnswerChoice = useMemo(() => data?.answerChoice || null, [data]);
  const initialAnswerText = useMemo(() => data?.answerText || "", [data]);

  const [questionType, setQuestionType] =
    useState<QuestionType>(initialQuestionType);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(
    initialAnswerChoice
  );
  const [answerText, setAnswerText] = useState<string>(initialAnswerText);
  const [solution, setSolution] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const handleQuestionTypeChange = (value: QuestionType) => {
    setQuestionType(value);
    // 문제 유형이 변경되면 관련 값 초기화
    if (value === "objective") {
      setAnswerText("");
    } else {
      setSelectedNumber(null);
    }
  };

  const handleNumberSelect = (value: number) => {
    setSelectedNumber(value === selectedNumber ? null : value);
  };

  const handleAnswerChange = (value: string) => {
    setAnswerText(value);
  };

  const handleCloseModal = () => {
    setIsCompleteModalOpen(false);
  };
  const handleComplete = () => {
    setIsCompleteModalOpen(false);
    router.push(`/wrong/${id}`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <ProblemSection {...data} />
        <AnswerSection
          {...data}
          questionType={questionType}
          answerChoice={selectedNumber}
          answerText={answerText}
          onQuestionTypeChange={handleQuestionTypeChange}
          onNumberSelect={handleNumberSelect}
          onAnswerChange={handleAnswerChange}
        />
        ``
        <SolutionSection solution={solution} onSolutionChange={setSolution} />
      </div>
      <div className={styles.bottomButtonContainer}>
        <div className={styles.bottomButtonWrapper}>
          <Button
            fullWidth
            onClick={() => setIsCompleteModalOpen(true)}
            tone="dark"
            label="수정 완료"
            size="48"
          />
        </div>
      </div>
      <CompleteModal
        title="수정을 완료할까요?"
        description="입력한 풀이는 저장되며, 수정이 완료 처리돼요."
        cancelLabel="아니요"
        confirmLabel="완료"
        isOpen={isCompleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleComplete}
      />
    </div>
  );
};
