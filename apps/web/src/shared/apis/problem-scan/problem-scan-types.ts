export type ProblemScanStatus = "UPLOADED" | "OCR_DONE" | "AI_DONE" | "FAILED";
export type ProblemScanGroupId = number | null;

export type ProblemScanCreateResponse = {
  scanId: number;
  assetId: number;
  status: ProblemScanStatus;
};

export type ProblemScanGroupCreateResponse = {
  groupId?: ProblemScanGroupId;
  scanIds: number[];
};

export type ProblemScanGroupSummaryResponse = {
  groupId?: ProblemScanGroupId;
  status?: ProblemScanStatus;
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
