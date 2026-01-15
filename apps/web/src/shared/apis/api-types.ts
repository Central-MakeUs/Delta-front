export type ApiResponse<T> = {
  status: number;
  code: string;
  data: T;
  message: string;
};

export type ApiResponseError = {
  status: number;
  code: string;
  data: null;
  message: string;
};

export const isApiResponseError = (v: unknown): v is ApiResponseError => {
  if (!v || typeof v !== "object") return false;

  const o = v as Record<string, unknown>;
  return (
    typeof o.status === "number" &&
    typeof o.code === "string" &&
    "data" in o &&
    o.data === null &&
    typeof o.message === "string"
  );
};

export const unwrapApiResponse = <T>(res: ApiResponse<T>) => res.data;
