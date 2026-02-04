export type ProblemListItem = {
  problemId: number;
  subject: {
    id: string;
    name: string;
  };
  unit: {
    id: string;
    name: string;
  };
  types: Array<{
    id: string;
    name: string;
  }>;
  previewImage: {
    assetId: number;
    viewUrl: string;
  };
  createdAt: string;
  isCompleted?: boolean;
};
