"use client";

import { useState } from "react";
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
import { getWrongDetailDataById } from "../mocks/wrong-dummy";

const WrongDetailContent = () => {
  const params = useParams();
  const id = params.id as string;
  const data = getWrongDetailDataById(id);

  const [solution, setSolution] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const handleConfirm = () => {
    setIsCompleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCompleteModalOpen(false);
  };

  // const handleComplete = () => {
  // };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <HeaderSection {...data} />

          <QuestionSection {...data} />

          <div className={styles.inputSection}>
            <div className={styles.inputContent}>
              <AnswerSection {...data} />
              <SolutionSection value={solution} onChange={setSolution} />
            </div>
          </div>
        </div>
      </div>

      <BottomButton
        {...data}
        onClick={handleConfirm}
        disabled={!solution.trim() || data.isCompleted}
      />

      <CompleteModal
        title="오답을 완료할까요?"
        description="입력한 풀이는 저장되며, 오답이 완료 처리돼요."
        cancelLabel="아니요"
        confirmLabel="완료"
        isOpen={isCompleteModalOpen}
        onClose={handleCloseModal}
        // onConfirm={handleComplete}
      />
    </div>
  );
};

export default WrongDetailContent;
