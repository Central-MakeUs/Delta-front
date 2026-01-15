import type { ApiResponseError } from "@/shared/apis/api-types";

export type ApiErrorParams = {
  status: number;
  code: string;
  message: string;
  traceId?: string | null;
};

export class ApiError extends Error {
  status: number;
  code: string;
  traceId?: string | null;

  constructor(params: ApiErrorParams) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code;
    this.traceId = params.traceId ?? null;
  }

  static fromPayload = (payload: ApiResponseError, traceId?: string | null) => {
    return new ApiError({
      status: payload.status,
      code: payload.code,
      message: payload.message,
      traceId,
    });
  };
}
