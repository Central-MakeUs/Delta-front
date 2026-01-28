import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProblemDetailQuery } from "@/shared/apis/problem-detail/hooks/use-get-problem-detail-query";
import { useUpdateProblemDetailMutation } from "@/shared/apis/problem-detail/hooks/use-update-problem-detail-mutation";
import { mapProblemDetailToSectionData } from "../../components/utils/map-problem-detail-to-section-data";
import type { UpdateProblemRequest } from "@/shared/apis/problem-detail/problem-detail-types";
import type { QuestionType } from "../components/answer-section/answer-section";
import type { WrongDetailSectionData } from "../../components/types";

export const useWrongEditForm = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError } = useGetProblemDetailQuery(id);
  const updateMutation = useUpdateProblemDetailMutation();

  const sectionData = useMemo<WrongDetailSectionData | null>(() => {
    if (!data) return null;
    return mapProblemDetailToSectionData(data);
  }, [data]);

  const [questionType, setQuestionType] = useState<QuestionType>("objective");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setQuestionType(sectionData.questionType);
      setSelectedNumber(sectionData.answerChoice);
      setAnswerText(sectionData.answerText || "");
    }
    if (data?.solutionText) {
      setSolution(data.solutionText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.problemId]);

  const handleQuestionTypeChange = (value: QuestionType) => {
    setQuestionType(value);
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

  const openCompleteModal = () => {
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    if (updateMutation.isPending) return;
    setIsCompleteModalOpen(false);
  };

  const handleComplete = async () => {
    if (!data || updateMutation.isPending) return;

    const updateBody: UpdateProblemRequest = {};

    if (data.answerFormat === "CHOICE" && selectedNumber !== null) {
      updateBody.answerChoiceNo = Number(selectedNumber);
    }

    if (data.answerFormat !== "CHOICE" && answerText) {
      updateBody.answerValue = answerText;
    }

    if (solution) {
      updateBody.solutionText = solution;
    }

    try {
      await updateMutation.mutateAsync({
        problemId: String(id),
        body: updateBody,
      });
      setIsCompleteModalOpen(false);
      router.push(`/wrong/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return {
    data,
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
    isPending: updateMutation.isPending,
  };
};
