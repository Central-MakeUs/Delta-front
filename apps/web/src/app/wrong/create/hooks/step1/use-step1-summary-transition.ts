"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

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

  const transitionedScanIdRef = useRef<number | null>(null);
  const flowScanIdRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

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
    const active = currentStep === 1 && !!scanId;

    if (!active) {
      flowScanIdRef.current = null;
      transitionedScanIdRef.current = null;
      clearAllTimers();

      defer(() => {
        if (!mountedRef.current) return;
        if (currentStep === 1 && scanId) return;
        setIsWaitingDelay(false);
        setIsRetryActionsVisible(false);
        setScanIdForSummaryQuery(null);
      });

      return;
    }

    if (flowScanIdRef.current === scanId) return;

    flowScanIdRef.current = scanId;
    transitionedScanIdRef.current = null;

    clearAllTimers();

    const flowId = scanId;

    defer(() => {
      if (!mountedRef.current) return;
      if (flowScanIdRef.current !== flowId) return;
      setIsRetryActionsVisible(false);
      setScanIdForSummaryQuery(null);
      setIsWaitingDelay(true);
    });

    maxWaitTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      if (flowScanIdRef.current !== flowId) return;
      setIsRetryActionsVisible(true);
      clearPollTimer();
      maxWaitTimerRef.current = null;
    }, SUMMARY_MAX_WAIT_MS);

    delayTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      if (flowScanIdRef.current !== flowId) return;
      setScanIdForSummaryQuery(flowId);
      setIsWaitingDelay(false);
      delayTimerRef.current = null;
    }, SUMMARY_FETCH_DELAY_MS);
  }, [currentStep, scanId, clearAllTimers, clearPollTimer]);

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
    isSummaryReady,
    isSummaryError,
    goStep,
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

      transitionedScanIdRef.current = null;
      flowScanIdRef.current = null;

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
