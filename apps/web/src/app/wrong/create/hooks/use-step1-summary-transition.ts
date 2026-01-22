"use client";

import { useEffect, useState } from "react";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

const SUMMARY_FETCH_DELAY_MS = 7000;

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

  const {
    data: prefetchedSummary,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
  } = useProblemScanSummaryQuery(
    currentStep === 1 ? scanIdForSummaryQuery : null
  );

  useEffect(() => {
    if (currentStep !== 1) return;
    if (!scanId) return;
    if (!scanIdForSummaryQuery) return;
    if (!prefetchedSummary && !isSummaryError) return;

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
    prefetchedSummary,
    isSummaryError,
    spString,
    pathname,
    router,
  ]);

  const handleUploaded = (res: ProblemScanCreateResponse) => {
    goStep(1, { scanId: String(res.scanId) });

    setIsWaitingDelay(true);
    window.setTimeout(() => {
      setScanIdForSummaryQuery(res.scanId);
      setIsWaitingDelay(false);
    }, SUMMARY_FETCH_DELAY_MS);
  };

  const isStep1Blocked =
    currentStep === 1 && (isWaitingDelay || isSummaryFetching);

  return { handleUploaded, isStep1Blocked };
};
