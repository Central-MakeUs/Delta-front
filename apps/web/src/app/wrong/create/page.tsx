"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { parseProgress } from "@/shared/components/app-bar/utils/app-bar-routing";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";
import Step1 from "@/app/wrong/create/components/steps/step-1";
import Step2 from "@/app/wrong/create/components/steps/step-2";
import Step3 from "@/app/wrong/create/components/steps/step-3";
import Step4 from "@/app/wrong/create/components/steps/step-4";
import { Button } from "@/shared/components/button/button/button";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/app/wrong/create/create.css";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

export type StepProps = {
  onNextEnabledChange?: (enabled: boolean) => void;
};

const SUMMARY_FETCH_DELAY_MS = 7000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const readScanId = (sp: URLSearchParams) => {
  const raw = sp.get("scanId");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

const WrongCreatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { total, currentStep } = parseProgress(new URLSearchParams(spString));

  const scanId = useMemo(() => readScanId(params), [params]);

  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const goStep = (nextStep: number, extra?: Record<string, string | null>) => {
    const safe = clamp(nextStep, 1, total);
    const nextParams = new URLSearchParams(spString);
    nextParams.set("step", String(safe));

    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v === null) nextParams.delete(k);
        else nextParams.set(k, v);
      });
    }

    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];

  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const handleNext = () => {
    if (!isNextEnabled) return;

    setIsNextEnabled(false);

    if (currentStep === 2) goStep(3);
    if (currentStep === 3) goStep(4);
    if (currentStep === 4) router.push(ROUTES.WRONG.CREATE_DONE);
  };

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
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
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
    }, SUMMARY_FETCH_DELAY_MS);
  };

  const isStep1Blocked =
    currentStep === 1 && (isWaitingDelay || isSummaryFetching);

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      <div className={s.stepShell}>
        <div className={s.stepContent}>
          {currentStep === 1 ? (
            <Step1 onNext={handleUploaded} disabled={isStep1Blocked} />
          ) : null}

          {currentStep === 2 ? (
            <Step2
              key={String(scanId ?? "none")}
              scanId={scanId}
              onNextEnabledChange={setIsNextEnabled}
            />
          ) : null}

          {currentStep === 3 ? (
            <Step3
              key={String(scanId ?? "none")}
              scanId={scanId}
              onNextEnabledChange={setIsNextEnabled}
            />
          ) : null}

          {currentStep === 4 ? (
            <Step4 onNextEnabledChange={setIsNextEnabled} />
          ) : null}
        </div>

        {showNext ? (
          <div className={s.nextSection}>
            <Button
              size="60"
              fullWidth
              label="다음"
              tone={isNextEnabled ? "dark" : "surface"}
              disabled={!isNextEnabled}
              tabIndex={isNextEnabled ? 0 : -1}
              onClick={handleNext}
              className={!isNextEnabled ? s.nextDisabled : undefined}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WrongCreatePage;
