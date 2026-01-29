import type { ProblemDetailResponse } from "@/shared/apis/problem-detail/problem-detail-types";
import type { WrongDetailSectionData } from "../types";

export const mapProblemDetailToSectionData = (
  data: ProblemDetailResponse
): WrongDetailSectionData => {
  const subjectName = data.subject?.name ?? "";
  const unitName = data.unit?.name ?? "";
  const typeName = data.type?.name ?? "";

  return {
    id: String(data.problemId),
    title: `${subjectName} ${unitName}`,
    subjectChip: subjectName,
    imagePath: data.originalImage?.viewUrl ?? "",
    questionType: data.answerFormat === "CHOICE" ? "objective" : "subjective",
    answerChoice: data.answerChoiceNo,
    answerText: data.answerValue,
    chips: [
      ...(unitName ? [{ label: unitName }] : []),
      ...(typeName ? [{ label: typeName }] : []),
    ],
    isCompleted: data.completed,
  };
};
