export type WrongCardData = {
  id: string;
  title: string;
  date: string;
  imageSrc: string;
  chips: {
    primary: string;
    secondary: string[];
  };
  href: string;
  isCompleted?: boolean;
  chapterId: string;
  dropdownIds: string[];
  typeIds: string[];
};
