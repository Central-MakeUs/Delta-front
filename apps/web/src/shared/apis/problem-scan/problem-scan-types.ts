export type ProblemScanStatus = "UPLOADED" | "OCR_DONE" | "AI_DONE" | "FAILED";

export type ProblemScanCreateResponse = {
  scanId: number;
  assetId: number;
  status: ProblemScanStatus | string;
};

export type ProblemScanGroupCreateResponse = {
  groupId?: number | string | null;
  scanIds: number[];
};

export type ProblemScanGroupSummaryResponse = {
  groupId?: number | string | null;
  status?: string;
  completedScanCount?: number;
  totalScanCount?: number;
  summaries: ProblemScanSummaryResponse[];
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
  failReason?: string | null;
  status: ProblemScanStatus;
  originalImage: ProblemScanOriginalImage;
  classification: ProblemScanSummaryClassification;
};
