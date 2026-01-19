import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ProblemScanCreateResponse,
  ProblemScanSummaryResponse,
} from "@/shared/apis/problem-scan/problem-scan-types";

type RawProblemScanCreateResponse = {
  scanId?: number;
  assetId?: number;
  status?: string;
};

type RawCurriculumItem = {
  id?: string;
  name?: string;
};

type RawProblemScanSummaryResponse = {
  scanId?: number;
  status?: "UPLOADED" | "OCR_DONE" | "AI_DONE" | "FAILED" | string;
  originalImage?: {
    assetId?: number;
    viewUrl?: string;
    width?: number;
    height?: number;
  };
  classification?: {
    subject?: RawCurriculumItem | null;
    unit?: RawCurriculumItem | null;
    type?: RawCurriculumItem | null;
    needsReview?: boolean;
  };
};

const normalizeCreate = (
  raw: RawProblemScanCreateResponse
): ProblemScanCreateResponse => {
  return {
    scanId: raw.scanId ?? 0,
    assetId: raw.assetId ?? 0,
    status: raw.status ?? "UPLOADED",
  };
};

const normalizeSummary = (
  raw: RawProblemScanSummaryResponse
): ProblemScanSummaryResponse => {
  return {
    scanId: raw.scanId ?? 0,
    status: (raw.status ?? "UPLOADED") as ProblemScanSummaryResponse["status"],
    originalImage: {
      assetId: raw.originalImage?.assetId ?? 0,
      viewUrl: raw.originalImage?.viewUrl ?? "",
      width: raw.originalImage?.width,
      height: raw.originalImage?.height,
    },
    classification: {
      subject: raw.classification?.subject
        ? {
            id: raw.classification.subject.id ?? "",
            name: raw.classification.subject.name ?? "",
          }
        : null,
      unit: raw.classification?.unit
        ? {
            id: raw.classification.unit.id ?? "",
            name: raw.classification.unit.name ?? "",
          }
        : null,
      type: raw.classification?.type
        ? {
            id: raw.classification.type.id ?? "",
            name: raw.classification.type.name ?? "",
          }
        : null,
      needsReview: raw.classification?.needsReview ?? false,
    },
  };
};

export const problemScanApi = {
  create: async (params: { file: File }) => {
    const form = new FormData();
    form.append("file", params.file);

    const res = await instance.post<ApiResponse<RawProblemScanCreateResponse>>(
      API_PATHS.PROBLEM_SCANS.ROOT,
      form
    );

    return normalizeCreate(unwrapApiResponse(res.data));
  },

  getSummary: async (params: { scanId: number | string }) => {
    const res = await instance.get<ApiResponse<RawProblemScanSummaryResponse>>(
      API_PATHS.PROBLEM_SCANS.SUMMARY(params.scanId)
    );

    return normalizeSummary(unwrapApiResponse(res.data));
  },
};
