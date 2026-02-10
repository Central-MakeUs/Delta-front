"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { toastError } from "@/shared/components/toast/toast";
import { getFailToastMessage } from "@/app/wrong/create/utils/get-fail-toast-message";

const SUMMARY_FETCH_DELAY_MS = 4000;
const SUMMARY_POLL_INTERVAL_MS = 2000;
const SUMMARY_MAX_WAIT_MS = 15000;

type Params = {
  currentStep: number;
  scanId: number | null;
  spString: string;
  pathname: string;
  router: { replace: (href: string, options?: { scroll?: boolean }) => void };
  goStep: (nextStep: number, extra?: Record<string, string | null>) => void;
};

const defer = (fn: () => void) => {
  Promise.resolve().then(fn);
};

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const unwrapDataLayers = (raw: unknown, maxDepth = 6) => {
  let cur: unknown = raw;

  for (let i = 0; i < maxDepth; i += 1) {
    if (!isObject(cur)) break;
    if (!("data" in cur)) break;
    cur = cur.data;
  }

  return cur;
};

const readStringField = (raw: unknown, key: string) => {
  const unwrapped = unwrapDataLayers(raw);
  if (!isObject(unwrapped)) return null;

  const v = unwrapped[key];
  if (typeof v !== "string") return null;

  const t = v.trim();
  return t.length > 0 ? t : null;
};

const readStatus = (raw: unknown) => readStringField(raw, "status");
const readFailReason = (raw: unknown) => readStringField(raw, "failReason");

const readClassification = (raw: unknown) => {
  const unwrapped = unwrapDataLayers(raw);
  if (!isObject(unwrapped)) return null;

  const cls = unwrapped.classification;
  if (!isObject(cls)) return null;

  const needsReview =
    typeof cls.needsReview === "boolean" ? cls.needsReview : false;

  const subject =
    isObject(cls.subject) && typeof cls.subject.id === "string"
      ? { id: cls.subject.id }
      : null;

  const unit =
    isObject(cls.unit) && typeof cls.unit.id === "string"
      ? { id: cls.unit.id }
      : null;

  const types = Array.isArray(cls.types) ? cls.types : [];

  const hasTypes = types.length > 0;

  return {
    needsReview,
    hasSubject: !!subject?.id,
    hasUnit: !!unit?.id,
    hasTypes,
  };
};

export const useStep1SummaryTransition = ({
  currentStep,
  scanId,
  goStep,
}: Params) => {
  const [scanIdForSummaryQuery, setScanIdForSummaryQuery] = useState<
    number | null
  >(null);
  const [isWaitingDelay, setIsWaitingDelay] = useState(false);
  const [isRetryActionsVisible, setIsRetryActionsVisible] = useState(false);

  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mountedRef = useRef(true);
  const flowScanIdRef = useRef<number | null>(null);
  const transitionedScanIdRef = useRef<number | null>(null);
  const failedScanIdRef = useRef<number | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const clearDelayTimer = useCallback(() => {
    if (!delayTimerRef.current) return;
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = null;
  }, []);

  const clearPollTimer = useCallback(() => {
    if (!pollTimerRef.current) return;
    clearInterval(pollTimerRef.current);
    pollTimerRef.current = null;
  }, []);

  const clearMaxWaitTimer = useCallback(() => {
    if (!maxWaitTimerRef.current) return;
    clearTimeout(maxWaitTimerRef.current);
    maxWaitTimerRef.current = null;
  }, []);

  const clearAllTimers = useCallback(() => {
    clearDelayTimer();
    clearPollTimer();
    clearMaxWaitTimer();
  }, [clearDelayTimer, clearPollTimer, clearMaxWaitTimer]);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  useEffect(() => {
    if (!scanId) {
      flowScanIdRef.current = null;
      transitionedScanIdRef.current = null;
      failedScanIdRef.current = null;
      clearAllTimers();

      defer(() => {
        if (!mountedRef.current) return;
        setScanIdForSummaryQuery(null);
        setIsWaitingDelay(false);
        setIsRetryActionsVisible(false);
      });

      return;
    }

    if (flowScanIdRef.current === scanId) return;

    flowScanIdRef.current = scanId;
    transitionedScanIdRef.current = null;
    failedScanIdRef.current = null;

    clearAllTimers();

    const flowId = scanId;

    defer(() => {
      if (!mountedRef.current) return;
      if (flowScanIdRef.current !== flowId) return;
      setScanIdForSummaryQuery(flowId);
      setIsRetryActionsVisible(false);
      setIsWaitingDelay(currentStep === 1);
    });

    if (currentStep === 1) {
      delayTimerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        if (flowScanIdRef.current !== flowId) return;
        setIsWaitingDelay(false);
        delayTimerRef.current = null;
      }, SUMMARY_FETCH_DELAY_MS);
    }

    maxWaitTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      if (flowScanIdRef.current !== flowId) return;
      setIsRetryActionsVisible(true);
      clearPollTimer();
      maxWaitTimerRef.current = null;
    }, SUMMARY_MAX_WAIT_MS);
  }, [scanId, currentStep, clearAllTimers, clearPollTimer]);

  const {
    data: prefetchedSummary,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useProblemScanSummaryQuery(scanIdForSummaryQuery);

  const failReason = useMemo(
    () => readFailReason(prefetchedSummary),
    [prefetchedSummary]
  );
  const scanStatus = useMemo(
    () => readStatus(prefetchedSummary),
    [prefetchedSummary]
  );

  const isFailed = useMemo(() => {
    if (failReason) return true;
    if (scanStatus === "FAILED") return true;
    return false;
  }, [failReason, scanStatus]);

  useEffect(() => {
    if (!scanIdForSummaryQuery) return;
    if (!isFailed) return;

    if (failedScanIdRef.current === scanIdForSummaryQuery) return;
    failedScanIdRef.current = scanIdForSummaryQuery;

    clearAllTimers();

    toastError(getFailToastMessage(failReason ?? "UNKNOWN"), 6.5);

    defer(() => {
      if (!mountedRef.current) return;

      setScanIdForSummaryQuery(null);
      setIsWaitingDelay(false);
      setIsRetryActionsVisible(false);

      goStep(1, {
        scanId: null,
        chapterId: null,
        unitId: null,
        typeIds: null,
      });
    });
  }, [scanIdForSummaryQuery, isFailed, failReason, clearAllTimers, goStep]);

  const clsState = useMemo(
    () => readClassification(prefetchedSummary),
    [prefetchedSummary]
  );

  const isSummaryReady = useMemo(() => {
    if (!prefetchedSummary) return false;
    if (isFailed) return false;

    if (!clsState) return false;
    if (clsState.needsReview) return true;

    return (
      scanStatus === "AI_DONE" &&
      clsState.hasSubject &&
      clsState.hasUnit &&
      clsState.hasTypes
    );
  }, [prefetchedSummary, isFailed, clsState, scanStatus]);

  const showRetryActions = useMemo(() => {
    const isErrorStable = isSummaryError && !isSummaryFetching;
    return isRetryActionsVisible || isErrorStable;
  }, [isRetryActionsVisible, isSummaryError, isSummaryFetching]);

  useEffect(() => {
    if (currentStep !== 1) return;
    if (!scanId) return;
    if (!scanIdForSummaryQuery) return;
    if (isFailed) return;
    if (!isSummaryReady) return;

    if (transitionedScanIdRef.current === scanId) return;
    transitionedScanIdRef.current = scanId;

    goStep(2, {
      scanId: String(scanId),
      chapterId: null,
      unitId: null,
      typeIds: null,
    });
  }, [
    currentStep,
    scanId,
    scanIdForSummaryQuery,
    isFailed,
    isSummaryReady,
    goStep,
  ]);

  useEffect(() => {
    if (!scanIdForSummaryQuery) return;

    if (isFailed) {
      clearPollTimer();
      clearMaxWaitTimer();
      return;
    }

    if (isSummaryReady) {
      clearPollTimer();
      clearMaxWaitTimer();
      return;
    }

    if (isSummaryError) {
      clearPollTimer();
      return;
    }

    if (showRetryActions) {
      clearPollTimer();
      return;
    }

    if (!pollTimerRef.current) {
      pollTimerRef.current = setInterval(() => {
        refetchSummary();
      }, SUMMARY_POLL_INTERVAL_MS);
    }

    return () => clearPollTimer();
  }, [
    scanIdForSummaryQuery,
    isFailed,
    isSummaryReady,
    isSummaryError,
    showRetryActions,
    refetchSummary,
    clearPollTimer,
    clearMaxWaitTimer,
  ]);

  const retrySummary = useCallback(() => {
    setIsRetryActionsVisible(false);
    clearPollTimer();
    clearMaxWaitTimer();

    const flowId = flowScanIdRef.current;

    if (flowId) {
      maxWaitTimerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        if (flowScanIdRef.current !== flowId) return;
        setIsRetryActionsVisible(true);
        clearPollTimer();
        maxWaitTimerRef.current = null;
      }, SUMMARY_MAX_WAIT_MS);
    }

    refetchSummary();
  }, [refetchSummary, clearPollTimer, clearMaxWaitTimer]);

  const handleUploaded = useCallback(
    (res: ProblemScanCreateResponse) => {
      const nextScanId = res.scanId;

      flowScanIdRef.current = null;
      transitionedScanIdRef.current = null;
      failedScanIdRef.current = null;

      goStep(1, {
        scanId: String(nextScanId),
        chapterId: null,
        unitId: null,
        typeIds: null,
      });
    },
    [goStep]
  );

  const isStep1Blocked =
    currentStep === 1 &&
    (isWaitingDelay ||
      isSummaryFetching ||
      (!!scanIdForSummaryQuery && !isSummaryReady && !showRetryActions));

  return {
    handleUploaded,
    isStep1Blocked,
    showRetryActions,
    retrySummary,
  };
};

export default useStep1SummaryTransition;
