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
import { useStep4Form } from "@/app/wrong/create/hooks/use-step4-form";
import { useCreateWrongAnswerCardMutation } from "@/shared/apis/problem-create/hooks/use-create-wrong-answer-card-mutation";
import { ApiError } from "@/shared/apis/problem-create/problem-create-api";
import type {
  AnswerFormat,
  ProblemCreateRequest,
} from "@/shared/apis/problem-create/problem-create-types";

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

const readStr = (sp: URLSearchParams, key: string) => sp.get(key) ?? null;

const normalize = (v: string | null | undefined) => (v ?? "").trim();

const isPureNumber = (v: string) => {
  const s = normalize(v);
  if (!s) return false;
  return /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(s);
};

const looksLikeExpression = (v: string) => {
  const s = normalize(v);
  if (!s) return false;

  if (/[=^/\\{}]/.test(s)) return true;
  if (/(\\frac|\\sqrt|sqrt|frac)/i.test(s)) return true;
  if (/[+\-*]/.test(s)) return true;
  if (/[()]/.test(s)) return true;

  return false;
};

const inferSubjectiveFormat = (answerValue: string): AnswerFormat => {
  const v = normalize(answerValue);
  if (!v) return "TEXT";
  if (isPureNumber(v)) return "NUMBER";
  if (looksLikeExpression(v)) return "EXPRESSION";
  return "TEXT";
};

const WrongCreatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { total, currentStep } = parseProgress(new URLSearchParams(spString));

  const scanId = useMemo(() => readScanId(params), [params]);
  const unitId = useMemo(() => readStr(params, "unitId"), [params]);
  const typeId = useMemo(() => readStr(params, "typeId"), [params]);

  const [stepNextEnabled, setStepNextEnabled] = useState(false);

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

    const nextQuery = nextParams.toString();
    if (nextQuery === spString) return;
    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  };

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];

  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const { form, handlers, isNextEnabled: step4Enabled } = useStep4Form();

  const createMutation = useCreateWrongAnswerCardMutation();

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

  const canNext = currentStep === 4 ? step4Enabled : stepNextEnabled;

  const handleNext = async () => {
    if (!canNext) return;

    if (currentStep === 2) {
      setStepNextEnabled(false);
      goStep(3);
      return;
    }

    if (currentStep === 3) {
      setStepNextEnabled(false);
      goStep(4);
      return;
    }

    if (currentStep === 4) {
      if (createMutation.isPending) return;
      if (!scanId) return;

      const finalUnitId = normalize(unitId);
      const finalTypeId = normalize(typeId);
      const solutionText = normalize(form.solutionText);

      let answerFormat: AnswerFormat;
      let answerChoiceNo: number | null = null;
      let answerValue: string | null = null;

      if (form.type === "objective") {
        answerFormat = "CHOICE";
        answerChoiceNo = form.answerChoice;

        if (answerChoiceNo === null) {
          window.alert("정답 번호를 선택해 주세요.");
          return;
        }
        if (answerChoiceNo < 1) {
          window.alert("정답 번호가 올바르지 않아요.");
          return;
        }
      } else {
        const v = normalize(form.answerText);
        if (!v) {
          window.alert("정답을 입력해 주세요.");
          return;
        }

        answerFormat = inferSubjectiveFormat(v);
        answerValue = v;
      }

      const payload: ProblemCreateRequest = {
        scanId,
        finalUnitId,
        finalTypeId,
        answerFormat,
        answerChoiceNo,
        answerValue,
        solutionText,
      };

      try {
        await createMutation.mutateAsync(payload);
        router.push(ROUTES.WRONG.CREATE_DONE);
      } catch (e) {
        const err = e as unknown;

        if (err instanceof ApiError && err.status === 409) {
          window.alert(err.message);
          router.push(ROUTES.WRONG.CREATE_DONE);
          return;
        }

        const msg =
          err instanceof ApiError
            ? err.message
            : "저장에 실패했어요. 다시 시도해 주세요.";
        window.alert(msg);
      }
    }
  };

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
              onNextEnabledChange={setStepNextEnabled}
            />
          ) : null}

          {currentStep === 3 ? (
            <Step3
              key={String(scanId ?? "none")}
              scanId={scanId}
              onNextEnabledChange={setStepNextEnabled}
            />
          ) : null}

          {currentStep === 4 ? (
            <Step4
              onNextEnabledChange={setStepNextEnabled}
              form={form}
              handlers={handlers}
            />
          ) : null}
        </div>

        {showNext ? (
          <div className={s.nextSection}>
            <Button
              size="60"
              fullWidth
              label="다음"
              tone={canNext ? "dark" : "surface"}
              disabled={!canNext || createMutation.isPending}
              tabIndex={canNext ? 0 : -1}
              onClick={handleNext}
              className={!canNext ? s.nextDisabled : undefined}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WrongCreatePage;
