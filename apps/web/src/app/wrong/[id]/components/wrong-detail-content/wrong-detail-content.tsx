"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./wrong-detail-content.css";
import {
  HeaderSection,
  QuestionSection,
  AnswerSection,
  SolutionSection,
} from "../sections";
import { BottomButton } from "../actions";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import { DUMMY_DATA } from "../mocks/wrong-dummy";

const WrongDetailContent = () => {
  const [solution, setSolution] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsCompleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCompleteModalOpen(false);
  };

  const handleComplete = () => {
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <HeaderSection
            title={DUMMY_DATA.title}
            subjectChip={DUMMY_DATA.subjectChip}
            chips={DUMMY_DATA.chips}
          />

          <QuestionSection />

          <div className={styles.inputSection}>
            <div className={styles.inputContent}>
              <AnswerSection answer={DUMMY_DATA.answer} />
              <SolutionSection value={solution} onChange={setSolution} />
            </div>
          </div>
        </div>
      </div>

      <BottomButton onClick={handleConfirm} disabled={!solution.trim()} />

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
