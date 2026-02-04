"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiError } from "@/shared/apis/api-error";
import { ERROR_CODES } from "@/shared/apis/error-codes";

const toastErrorSafe = (message: string) => {
  if (typeof window === "undefined") return;

  import("@/shared/components/toast/toast")
    .then(({ toastError }) => toastError(message, 6.5))
    .catch(() => undefined);
};

const getErrorMessage = (e: unknown) => {
  if (e instanceof ApiError) return e.message || "요청에 실패했어요.";
  if (e instanceof Error) return e.message || "요청에 실패했어요.";
  return "요청에 실패했어요.";
};

const shouldToast = (e: unknown) => {
  if (!(e instanceof ApiError)) return true;

  const isAuthNoise =
    (e.status === 401 && e.code === ERROR_CODES.AUTH.TOKEN_REQUIRED) ||
    (e.status === 401 && e.code === ERROR_CODES.AUTH.AUTHENTICATION_FAILED);

  return !isAuthNoise;
};

const readToastFlag = (
  meta: Record<string, unknown> | undefined,
  fallback: boolean
) => {
  const v = meta?.toast;
  return typeof v === "boolean" ? v : fallback;
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (e, query) => {
            const toast = readToastFlag(query.meta, false);
            if (!toast) return;
            if (!shouldToast(e)) return;
            toastErrorSafe(getErrorMessage(e));
          },
        }),
        mutationCache: new MutationCache({
          onError: (e, _vars, _ctx, mutation) => {
            const toast = readToastFlag(mutation.meta, true);
            if (!toast) return;
            if (!shouldToast(e)) return;
            toastErrorSafe(getErrorMessage(e));
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
};

export default QueryProvider;
