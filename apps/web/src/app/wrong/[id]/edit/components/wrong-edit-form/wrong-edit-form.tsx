"use client";

import { useState } from "react";
import { ProblemSection } from "../problem-section/problem-section";
import {
  AnswerSection,
  type QuestionType,
} from "../answer-section/answer-section";
import { SolutionSection } from "../solution-section/solution-section";
import * as styles from "./wrong-edit-form.css";

export interface WrongEditFormProps {
  initialData?: {
    count: number;
    title: string;
    wrongCount: number;
    correctCount: number;
    imageUrl: string;
  };
}

export const WrongEditForm = ({ initialData }: WrongEditFormProps) => {
  const [questionType, setQuestionType] = useState<QuestionType>("objective");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [solution, setSolution] = useState("");

  const problemData = initialData || {
    count: 10,
    title: "공통수학1 문제",
    wrongCount: 10,
    correctCount: 0,
    imageUrl: "/placeholder-problem.png",
  };

  const handleNumberSelect = (value: number) => {
    if (questionType === "objective") {
      setSelectedNumber(value === selectedNumber ? null : value);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <ProblemSection
          count={problemData.count}
          title={problemData.title}
          wrongCount={problemData.wrongCount}
          correctCount={problemData.correctCount}
          imageUrl={problemData.imageUrl}
        />

        <AnswerSection
          questionType={questionType}
          selectedNumber={selectedNumber}
          onQuestionTypeChange={setQuestionType}
          onNumberSelect={handleNumberSelect}
        />

        <SolutionSection solution={solution} onSolutionChange={setSolution} />
      </div>
    </div>
  );
};
