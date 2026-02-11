export interface ChipData {
  label: string;
}

export interface WrongDetailSectionData {
  id: string;
  title: string;
  subjectChip: string;
  imagePath: string;
  questionType: "objective" | "subjective";
  answerChoice: number | null;
  answerText: string | null;
  chips: ChipData[];
  memoText: string | null;
  isCompleted: boolean;
}
