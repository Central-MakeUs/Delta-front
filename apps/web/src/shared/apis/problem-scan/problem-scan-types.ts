export type ProblemScanStatus = "UPLOADED" | "OCR_DONE" | "AI_DONE" | "FAILED";

export type ProblemScanCreateResponse = {
  scanId: number;
  assetId: number;
  status: ProblemScanStatus | string;
};

export type CurriculumItem = {
  id: string;
  name: string;
};

export type ProblemScanSummaryClassification = {
  subject?: CurriculumItem | null;
  unit?: CurriculumItem | null;
  types?: CurriculumItem[];
  needsReview?: boolean;
};

export type ProblemScanOriginalImage = {
  assetId: number;
  viewUrl: string;
  width?: number;
  height?: number;
};

export type ProblemScanSummaryResponse = {
  scanId: number;
  status: ProblemScanStatus;
  originalImage: ProblemScanOriginalImage;
  classification: ProblemScanSummaryClassification;
};
