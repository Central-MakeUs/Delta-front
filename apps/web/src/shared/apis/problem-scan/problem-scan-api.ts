import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type {
  ProblemScanCreateResponse,
  ProblemScanGroupCreateResponse,
  ProblemScanGroupId,
  ProblemScanGroupSummaryResponse,
  ProblemScanStatus,
  ProblemScanSummaryResponse,
} from "@/shared/apis/problem-scan/problem-scan-types";

type RawProblemScanCreateResponse = {
  scanId?: number;
  assetId?: number;
  status?: string;
};

type RawProblemScanGroupCreateResponse = {
  groupId?: number | string | null;
  scanGroupId?: number | string | null;
  scanIds?: unknown;
  scans?:
    | Array<{
        scanId?: number | null;
        assetId?: number | null;
        status?: string | null;
      } | null>
    | null;
};

type RawCurriculumItem = {
  id?: string;
  name?: string;
};

type RawProblemScanSummaryResponse = {
  scanId?: number;
  status?: "UPLOADED" | "OCR_DONE" | "AI_DONE" | "FAILED" | string;
  failReason?: string | null;
  originalImage?: {
    assetId?: number;
    viewUrl?: string;
    width?: number;
    height?: number;
  };
  classification?: {
    subject?: RawCurriculumItem | null;
    unit?: RawCurriculumItem | null;
    types?: RawCurriculumItem[] | null;
    needsReview?: boolean;
  };
};

const requireNumber = (v: unknown, field: string) => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  throw new Error(`[problemScanApi] Invalid ${field}: ${String(v)}`);
};

const toOptionalGroupId = (value: unknown): ProblemScanGroupId => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const ALLOWED_STATUS = ["UPLOADED", "OCR_DONE", "AI_DONE", "FAILED"] as const;

const coerceStatus = (v?: string | null): ProblemScanStatus =>
  (ALLOWED_STATUS as readonly string[]).includes(v ?? "")
    ? (v as ProblemScanStatus)
    : "UPLOADED";

const normalizeCreate = (
  raw: RawProblemScanCreateResponse
): ProblemScanCreateResponse => {
  return {
    scanId: requireNumber(raw.scanId, "scanId"),
    assetId: requireNumber(raw.assetId, "assetId"),
    status: coerceStatus(raw.status),
  };
};

type RawProblemScanGroupSummaryResponse = {
  groupId?: number | string | null;
  scanGroupId?: number | string | null;
  status?: string;
  completedScanCount?: number | null;
  completed_scan_count?: number | null;
  totalScanCount?: number | null;
  total_scan_count?: number | null;
  summaries?: RawProblemScanSummaryResponse[] | null;
  scans?: RawProblemScanSummaryResponse[] | null;
};

const toScanIdList = (raw: RawProblemScanGroupCreateResponse) => {
  if (Array.isArray(raw.scanIds)) {
    return raw.scanIds
      .map((value) => (typeof value === "number" ? value : Number(value)))
      .filter((value) => Number.isFinite(value));
  }

  if (Array.isArray(raw.scans)) {
    return raw.scans
      .map((item) => item?.scanId)
      .filter((value): value is number => typeof value === "number");
  }

  return [];
};

const normalizeGroupCreate = (
  raw: RawProblemScanGroupCreateResponse
): ProblemScanGroupCreateResponse => {
  return {
    groupId: toOptionalGroupId(raw.groupId ?? raw.scanGroupId),
    scanIds: toScanIdList(raw),
  };
};

const normalizeSummary = (
  raw: RawProblemScanSummaryResponse
): ProblemScanSummaryResponse => {
  const rawTypes = raw.classification?.types;

  return {
    scanId: requireNumber(raw.scanId, "scanId"),
    status: coerceStatus(raw.status) as ProblemScanSummaryResponse["status"],
    failReason: raw.failReason ?? null,
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

      types: (rawTypes ?? []).map((t) => ({
        id: t?.id ?? "",
        name: t?.name ?? "",
      })),

      needsReview: raw.classification?.needsReview ?? false,
    },
  };
};

const normalizeGroupSummary = (
  raw: RawProblemScanGroupSummaryResponse
): ProblemScanGroupSummaryResponse => {
  const rawSummaries = raw.summaries ?? raw.scans ?? [];

  return {
    groupId: toOptionalGroupId(raw.groupId ?? raw.scanGroupId),
    status: coerceStatus(raw.status),
    completedScanCount:
      raw.completedScanCount ?? raw.completed_scan_count ?? undefined,
    totalScanCount: raw.totalScanCount ?? raw.total_scan_count ?? undefined,
    summaries: rawSummaries.map(normalizeSummary),
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

  createGroup: async (params: { files: File[] }) => {
    const form = new FormData();
    params.files.forEach((file) => {
      form.append("files", file);
    });

    const res = await instance.post<ApiResponse<RawProblemScanGroupCreateResponse>>(
      API_PATHS.PROBLEM_SCANS.GROUPS,
      form
    );

    return normalizeGroupCreate(unwrapApiResponse(res.data));
  },

  getSummary: async (params: { scanId: number | string }) => {
    const res = await instance.get<ApiResponse<RawProblemScanSummaryResponse>>(
      API_PATHS.PROBLEM_SCANS.SUMMARY(params.scanId)
    );

    return normalizeSummary(unwrapApiResponse(res.data));
  },

  getGroupSummary: async (params: { groupId: number | string }) => {
    const res = await instance.get<ApiResponse<RawProblemScanGroupSummaryResponse>>(
      API_PATHS.PROBLEM_SCANS.GROUP_SUMMARY(params.groupId)
    );

    return normalizeGroupSummary(unwrapApiResponse(res.data));
  },
};
