"use client";
import { useState } from "react";
import type { WrongCreateGroupItem } from "@/app/wrong/create/utils/group-context";
import type { AnswerMode } from "@/app/wrong/scans/[id]/components/scan-answer-section";
import { buildAnswerFields } from "@/app/wrong/scans/[id]/payload";

export const useScanAnswerActions = ({
  initialMode,
  initialChoice,
  initialText,
  displayItem,
  persistGroupItem,
}: {
  initialMode: AnswerMode;
  initialChoice: number | null;
  initialText: string;
  displayItem: WrongCreateGroupItem | null;
  persistGroupItem: (nextItem: WrongCreateGroupItem) => void;
}) => {
  const [answerMode, setAnswerMode] = useState<AnswerMode>(initialMode);
  const [answerChoice, setAnswerChoice] = useState<number | null>(initialChoice);
  const [answerText, setAnswerText] = useState(initialText);

  const persistCurrentAnswer = (
    nextAnswerMode: AnswerMode,
    nextAnswerChoice: number | null,
    nextAnswerText: string
  ) => {
    if (!displayItem) return;

    persistGroupItem({
      ...displayItem,
      ...buildAnswerFields(nextAnswerMode, nextAnswerChoice, nextAnswerText),
    });
  };

  const handleAnswerModeChange = (value: AnswerMode) => {
    setAnswerMode(value);

    if (value === "objective") {
      setAnswerText("");
      persistCurrentAnswer(value, answerChoice, "");
      return;
    }

    setAnswerChoice(null);
    persistCurrentAnswer(value, null, answerText);
  };

  const handleAnswerChoiceChange = (value: number | null) => {
    setAnswerChoice(value);
    persistCurrentAnswer(answerMode, value, answerText);
  };

  const handleAnswerTextChange = (value: string) => {
    setAnswerText(value);
    persistCurrentAnswer(answerMode, answerChoice, value);
  };

  return {
    answerMode,
    answerChoice,
    answerText,
    handleAnswerModeChange,
    handleAnswerChoiceChange,
    handleAnswerTextChange,
  };
};
