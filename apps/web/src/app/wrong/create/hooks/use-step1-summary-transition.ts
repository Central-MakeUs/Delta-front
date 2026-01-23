"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

const SUMMARY_FETCH_DELAY_MS = 4000;
const SUMMARY_POLL_INTERVAL_MS = 2000;
const SUMMARY_MAX_WAIT_MS = 15000;

type RouterLike = {
  replace: (href: string, options?: { scroll?: boolean }) => void;
};

type Params = {
  currentStep: number;
  scanId: number | null;
  spString: string;
  pathname: string;
  router: RouterLike;
  goStep: (nextStep: number, extra?: Record<string, string | null>) => void;
};

export const useStep1SummaryTransition = ({
  currentStep,
  scanId,
  spString,
  pathname,
  router,
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

  const {
    data: prefetchedSummary,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useProblemScanSummaryQuery(
    currentStep === 1 ? scanIdForSummaryQuery : null
  );

  const isSummaryReady = useMemo(() => {
    if (!prefetchedSummary) return false;

    const cls = prefetchedSummary.classification;
    const hasSubject = !!cls?.subject?.id;
    const hasUnit = !!cls?.unit?.id;
    const hasTypes = Array.isArray(cls?.types) && cls.types.length > 0;
    const isAiDone = prefetchedSummary.status === "AI_DONE";
    const needsReview = cls?.needsReview === true;

    if (needsReview) return true;
    return isAiDone && hasSubject && hasUnit && hasTypes;
  }, [prefetchedSummary]);

  const showRetryActions = useMemo(() => {
    const isErrorStable = isSummaryError && !isSummaryFetching;
    return isRetryActionsVisible || isErrorStable;
  }, [isRetryActionsVisible, isSummaryError, isSummaryFetching]);

  useEffect(() => {
    if (currentStep !== 1) return;
    if (!scanId) return;
    if (!scanIdForSummaryQuery) return;
    if (!isSummaryReady && !isSummaryError) return;

    const nextParams = new URLSearchParams(spString);
    nextParams.set("step", "2");
    nextParams.set("scanId", String(scanId));

    const nextQuery = nextParams.toString();
    if (nextQuery === spString) return;

    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  }, [
    currentStep,
    scanId,
    scanIdForSummaryQuery,
    isSummaryReady,
    isSummaryError,
    spString,
    pathname,
    router,
  ]);

  useEffect(() => {
    if (currentStep !== 1) return;
    if (!scanIdForSummaryQuery) return;

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
    currentStep,
    scanIdForSummaryQuery,
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
    refetchSummary();
  }, [refetchSummary, clearPollTimer, clearMaxWaitTimer]);

  const handleUploaded = useCallback(
    (res: ProblemScanCreateResponse) => {
      goStep(1, { scanId: String(res.scanId) });

      clearAllTimers();
      setIsRetryActionsVisible(false);
      setScanIdForSummaryQuery(null);
      setIsWaitingDelay(true);

      maxWaitTimerRef.current = setTimeout(() => {
        setIsRetryActionsVisible(true);
        clearPollTimer();
        maxWaitTimerRef.current = null;
      }, SUMMARY_MAX_WAIT_MS);

      delayTimerRef.current = setTimeout(() => {
        setScanIdForSummaryQuery(res.scanId);
        setIsWaitingDelay(false);
        delayTimerRef.current = null;
      }, SUMMARY_FETCH_DELAY_MS);
    },
    [goStep, clearAllTimers, clearPollTimer]
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
