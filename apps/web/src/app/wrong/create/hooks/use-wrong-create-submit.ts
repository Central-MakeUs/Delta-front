"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ROUTES } from "@/shared/constants/routes";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { ApiError } from "@/shared/apis/problem-create/problem-create-api";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import type {
  AnswerFormat,
  ProblemCreateRequest,
} from "@/shared/apis/problem-create/problem-create-types";
import { toastError } from "@/shared/components/toast/toast";
import {
  createWrongCreateGroupId,
  saveWrongCreateGroupContext,
  type WrongCreateGroupItem,
} from "@/app/wrong/create/utils/group-context";
import {
  inferSubjectiveFormat,
  normalize,
} from "@/app/wrong/create/utils/answer-format";
import type { Step4FormState } from "@/app/wrong/create/hooks/step4/use-step4-form";
import { SUBJECT_NAME_BY_ID, UNIT_BY_ID } from "@/shared/constants/math-curriculum";

type Params = {
  currentStep: number;
  scanIds: number[];
  scanId: number | null;
  unitId: string | null;
  typeIds: string | null;
  stepNextEnabled: boolean;
  form: Step4FormState;
  goStep: (nextStep: number, extra?: Record<string, string | null>) => void;
  router: AppRouterInstance;
};

const parseTypeIds = (raw: string | null) => {
  return (raw ?? "")
    .split(",")
    .map((v) => normalize(v))
    .filter((v): v is string => Boolean(v));
};

const DEFAULT_SUBJECTIVE_FORMAT: AnswerFormat = "TEXT";
const FALLBACK_SUBJECT = "미분류";
const FALLBACK_UNIT = "등록한 문제";

export const useWrongCreateSubmit = ({
  currentStep,
  scanIds,
  scanId,
  unitId,
  typeIds,
  stepNextEnabled,
  form,
  goStep,
  router,
}: Params) => {
  const createMutation = useCreateBulkWrongAnswerCardsMutation();
  const { data: problemTypes = [] } = useProblemTypesQuery();

  const canNext = currentStep === 4 ? true : stepNextEnabled;

  const handleNext = async () => {
    if (!canNext) return;

    if (currentStep === 2) {
      goStep(3);
      return;
    }

    if (currentStep === 3) {
      goStep(4);
      return;
    }

    if (currentStep !== 4) return;
    if (createMutation.isPending) return;

    const targetScanIds = scanIds.length > 0 ? scanIds : scanId ? [scanId] : [];
    if (targetScanIds.length === 0) return;

    const finalUnitId = normalize(unitId);
    const finalTypeIds = parseTypeIds(typeIds);
    if (!finalUnitId) return;
    if (finalTypeIds.length === 0) return;

    const memoText = normalize(form.memoText);
    const normalizedAnswerText = normalize(form.answerText);

    const answerFormat: AnswerFormat =
      form.type === "objective"
        ? "CHOICE"
        : normalizedAnswerText
          ? inferSubjectiveFormat(normalizedAnswerText)
          : DEFAULT_SUBJECTIVE_FORMAT;

    const basePayload = {
      finalUnitId,
      finalTypeIds,
      answerFormat,
      ...(form.type === "objective" &&
      form.answerChoice !== null &&
      form.answerChoice >= 1
        ? { answerChoiceNo: form.answerChoice }
        : {}),
      ...(form.type === "subjective" && normalizedAnswerText
        ? { answerValue: normalizedAnswerText }
        : {}),
      ...(memoText ? { memoText } : {}),
    };

    const finalUnit = UNIT_BY_ID[finalUnitId];
    const subjectName =
      (finalUnit?.subjectId && SUBJECT_NAME_BY_ID[finalUnit.subjectId]) ??
      FALLBACK_SUBJECT;
    const unitName = finalUnit?.name ?? FALLBACK_UNIT;
    const selectedTypeNames = finalTypeIds
      .map(
        (typeId) =>
          problemTypes.find((type) => type.id === typeId)?.name ?? typeId
      )
      .filter(Boolean);

    const summaries = await Promise.all(
      targetScanIds.map((currentScanId) =>
        problemScanApi
          .getSummary({ scanId: currentScanId })
          .catch(() => null)
      )
    );

    const summaryByScanId = new Map(
      summaries
        .filter((summary): summary is NonNullable<typeof summary> => Boolean(summary))
        .map((summary) => [summary.scanId, summary])
    );

    const buildGroupItems = (scanIdList: number[]): WrongCreateGroupItem[] => {
      return scanIdList.map((currentScanId) => {
        const summary = summaryByScanId.get(currentScanId);
        return {
          scanId: currentScanId,
          finalUnitId,
          finalTypeIds,
          answerFormat,
          title: `${unitName} 문제`,
          imageUrl: summary?.originalImage.viewUrl ?? "",
          subjectName,
          unitName,
          typeNames: selectedTypeNames,
          needsReview: summary?.classification.needsReview ?? false,
        };
      });
    };

    const payload: ProblemCreateRequest[] = targetScanIds.map((currentScanId) => ({
      scanId: currentScanId,
      ...basePayload,
    }));
    const groupId = createWrongCreateGroupId();

    try {
      const response = await createMutation.mutateAsync(payload);
      const createdScanIds =
        response.problems.length > 0
          ? response.problems.map((problem) => problem.scanId)
          : targetScanIds;

      saveWrongCreateGroupContext({
        id: groupId,
        createdAt: Date.now(),
        items: buildGroupItems(createdScanIds),
      });

      router.push(`${ROUTES.WRONG.CREATE_DONE}?group=${encodeURIComponent(groupId)}`);
    } catch (e) {
      const err = e as unknown;
      if (err instanceof ApiError && err.status === 409) {
        saveWrongCreateGroupContext({
          id: groupId,
          createdAt: Date.now(),
          items: buildGroupItems(targetScanIds),
        });
        router.push(
          `${ROUTES.WRONG.CREATE_DONE}?group=${encodeURIComponent(groupId)}`
        );
        return;
      }

      console.error("[wrong-create] Failed to create wrong answer cards", err);
      toastError("오답 생성에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  return {
    canNext,
    handleNext,
    isSubmitting: createMutation.isPending,
  };
};

export default useWrongCreateSubmit;



