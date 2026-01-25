import type { ProblemListItem } from "@/shared/apis/problem-list/problem-list-types";
import type { WrongCardProps } from "@/app/wrong/(list)/components/wrong-card";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  } catch {
    return dateString;
  }
};

export const mapProblemListItemToCard = (
  item: ProblemListItem
): Omit<WrongCardProps, "imageAlt"> & { id: string } => {
  const subjectName = item.subject.name;
  const unitName = item.unit.name;
  const typeNames = item.types.map((type) => type.name);

  return {
    id: String(item.problemId),
    title: `${unitName} 문제`,
    date: formatDate(item.createdAt),
    imageSrc: item.previewImage.viewUrl,
    chips: {
      primary: subjectName,
      secondary: typeNames,
    },
    href: `/wrong/${item.problemId}`,
    isCompleted: item.isCompleted ?? false,
  };
};
