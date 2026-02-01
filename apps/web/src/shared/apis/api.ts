import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { tokenStorage } from "@/shared/apis/token-storage";
import { ApiError } from "@/shared/apis/api-error";
import { isApiResponseError } from "@/shared/apis/api-types";
import { ERROR_CODES } from "@/shared/apis/error-codes";
import {
  emitAuthLogout,
  isInAuthFlow,
} from "@/shared/apis/auth/auth-events";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import { API_HEADERS } from "@/shared/apis/constants/api-headers";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({ baseURL });
export const REFRESH_TOKEN_HEADER = API_HEADERS.REFRESH_TOKEN;
const ACCESS_HEADER = API_HEADERS.AUTHORIZATION;
const TRACE_HEADER = API_HEADERS.TRACE_ID;

type RetryConfig = AxiosRequestConfig & {
  _retry?: boolean;
  _skipAuthRefresh?: boolean;
};

const stripBearer = (v: string) => v.replace(/^Bearer\s+/i, "").trim();

const readHeader = (headers: Record<string, unknown>, key: string) => {
  const v = headers[key.toLowerCase()];
  return typeof v === "string" ? v : null;
};

const clearAuthHeader = (headers: unknown) => {
  if (!headers || typeof headers !== "object") return;
  const h = headers as Record<string, unknown>;
  delete h[ACCESS_HEADER];
  delete h[ACCESS_HEADER.toLowerCase()];
};

const syncTokensFromResponseHeaders = (headers: Record<string, unknown>) => {
  const accessRaw = readHeader(headers, ACCESS_HEADER);
  const refreshRaw = readHeader(headers, REFRESH_TOKEN_HEADER);

  const accessToken = accessRaw ? stripBearer(accessRaw) : null;
  const refreshToken = refreshRaw ?? null;

  if (accessToken || refreshToken) {
    tokenStorage.setTokens({
      accessToken: accessToken ?? undefined,
      refreshToken: refreshToken ?? undefined,
    });
  }
};

const handleAuthDead = () => {
  tokenStorage.clear();
  emitAuthLogout();
};

let reissuePromise: Promise<void> | null = null;

const runReissueOnce = async () => {
  if (reissuePromise) return reissuePromise;

  reissuePromise = (async () => {
    const { refreshToken } = tokenStorage.getTokens();
    if (!refreshToken) {
      handleAuthDead();
      throw new Error("refresh token missing");
    }

    const config: RetryConfig = {
      headers: { [REFRESH_TOKEN_HEADER]: refreshToken },
      _skipAuthRefresh: true,
    };

    await instance.post(API_PATHS.AUTH.REISSUE, null, config);
  })()
    .catch((e) => {
      handleAuthDead();
      throw e;
    })
    .finally(() => {
      reissuePromise = null;
    });

  return reissuePromise;
};

instance.interceptors.request.use((config) => {
  const { accessToken } = tokenStorage.getTokens();

  if (accessToken) {
    config.headers = config.headers ?? {};
    const h = config.headers as Record<string, unknown>;

    if (!h[ACCESS_HEADER] && !h[ACCESS_HEADER.toLowerCase()]) {
      h[ACCESS_HEADER] = `Bearer ${accessToken}`;
    }
  }

  return config;
});

instance.interceptors.response.use(
  (res) => {
    syncTokensFromResponseHeaders(res.headers as Record<string, unknown>);
    return res;
  },
  async (err: AxiosError) => {
    const config = (err.config ?? {}) as RetryConfig;

    if (config._skipAuthRefresh || config.url === API_PATHS.AUTH.REISSUE) {
      throw err;
    }

    const payload = err.response?.data;
    const headers = (err.response?.headers ?? {}) as Record<string, unknown>;
    const traceId = readHeader(headers, TRACE_HEADER);
    const status = err.response?.status;

    const shouldEmitAuthLogout = (s: number | undefined): boolean => {
      if (s !== 401 && s !== 403) return false;
      if (s === 401 && isInAuthFlow()) return false;
      return true;
    };

    if (!isApiResponseError(payload)) {
      if (shouldEmitAuthLogout(status)) handleAuthDead();
      throw err;
    }

    const apiError = ApiError.fromPayload(payload, traceId);

    if (
      apiError.status === 401 &&
      apiError.code === ERROR_CODES.AUTH.TOKEN_REQUIRED
    ) {
      if (shouldEmitAuthLogout(apiError.status)) handleAuthDead();
      throw apiError;
    }

    const canRetry =
      apiError.status === 401 &&
      apiError.code === ERROR_CODES.AUTH.AUTHENTICATION_FAILED &&
      !config._retry;

    if (!canRetry) {
      if (shouldEmitAuthLogout(apiError.status)) handleAuthDead();
      throw apiError;
    }

    config._retry = true;

    try {
      await runReissueOnce();
      clearAuthHeader(config.headers);
      return await instance(config);
    } catch {
      throw apiError;
    }
  }
);
