"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { toastError } from "@/shared/components/toast/toast";
import { getFailToastMessage } from "@/app/wrong/create/utils/get-fail-toast-message";
import type {
  ProblemScanGroupCreateResponse,
  ProblemScanGroupSummaryResponse,
  ProblemScanSummaryResponse,
} from "@/shared/apis/problem-scan/problem-scan-types";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { computeRecommendation } from "@/app/wrong/create/utils/chapter-recommend";
import {
  createWrongCreateGroupId,
  saveWrongCreateGroupContext,
} from "@/app/wrong/create/utils/group-context";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import { ROUTES } from "@/shared/constants/routes";
import {
  SUBJECT_NAME_BY_ID,
  UNIT_BY_ID,
} from "@/shared/constants/math-curriculum";

const POLL_INTERVAL_MS = 1200;

type Params = {
  scanIds: number[];
  groupId: string | null;
  goStep: (nextStep: number, extra?: Record<string, string | null>) => void;
  router: { push: (href: string) => void };
};

const dedupe = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean)));

const isFailedSummary = (summary: ProblemScanSummaryResponse) => {
  return summary.status === "FAILED" || Boolean(summary.failReason);
};

const buildPayloadFromSummary = (
  summary: ProblemScanSummaryResponse,
  problemTypeNames: Map<string, string>
): ProblemCreateRequest => {
  const fallback = computeRecommendation({
    aiSubjectName: summary.classification.subject?.name ?? null,
    aiUnitName: summary.classification.unit?.name ?? null,
  });

  const finalUnitId = summary.classification.unit?.id ?? fallback.unitId ?? "";

  const finalTypeIds = dedupe(
    (summary.classification.types ?? [])
      .map((type) => {
        if (type.id) return type.id;
        if (type.name) {
          return problemTypeNames.get(type.name.trim()) ?? null;
        }
        return null;
      })
      .filter((value): value is string => Boolean(value))
  );

  return {
    scanId: summary.scanId,
    finalUnitId,
    finalTypeIds,
    answerFormat: "TEXT",
  };
};

export const useStep1SummaryTransition = ({
  scanIds,
  groupId,
  goStep,
  router,
}: Params) => {
  const { data: problemTypes = [] } = useProblemTypesQuery();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const flowKeyRef = useRef<string>("");
  const createdFlowRef = useRef<string>("");
  const pollSummariesRef = useRef<() => void>(() => undefined);

  const problemTypeNames = useMemo(() => {
    return new Map(problemTypes.map((type) => [type.name.trim(), type.id]));
  }, [problemTypes]);

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const resetFlow = useCallback(() => {
    clearTimer();
    createdFlowRef.current = "";
    goStep(1, {
      scanId: null,
      groupId: null,
      scanIds: null,
      chapterId: null,
      unitId: null,
      typeIds: null,
    });
  }, [clearTimer, goStep]);

  const createGroupContext = useCallback(
    (summaries: ProblemScanSummaryResponse[]) => {
      const items = summaries.map((summary) => {
        const payload = buildPayloadFromSummary(summary, problemTypeNames);
        const unit = payload.finalUnitId ? UNIT_BY_ID[payload.finalUnitId] : undefined;
        const subjectName =
          summary?.classification.subject?.name ??
          (unit?.subjectId ? SUBJECT_NAME_BY_ID[unit.subjectId] : "Unknown");
        const unitName =
          summary?.classification.unit?.name ??
          unit?.name ??
          "Uploaded problem";
        const typeNames =
          payload?.finalTypeIds.map(
            (typeId) =>
              problemTypes.find((type) => type.id === typeId)?.name ?? typeId
          ) ?? [];

        return {
          scanId: payload.scanId,
          finalUnitId: payload.finalUnitId,
          finalTypeIds: payload.finalTypeIds,
          answerFormat: payload.answerFormat,
          answerChoiceNo: payload.answerChoiceNo ?? null,
          answerValue: payload.answerValue ?? null,
          title: `${unitName} 문제`,
          imageUrl: summary?.originalImage.viewUrl ?? "",
          subjectName,
          unitName,
          typeNames,
          needsReview:
            summary?.classification.needsReview ??
            (!payload.finalUnitId || payload.finalTypeIds.length === 0),
        };
      });

      const groupId = createWrongCreateGroupId();
      saveWrongCreateGroupContext({
        id: groupId,
        createdAt: Date.now(),
        items,
      });

      router.push(
        `${ROUTES.WRONG.CREATE_SCANS}?group=${encodeURIComponent(groupId)}`
      );
    },
    [problemTypeNames, problemTypes, router]
  );

  const pollSummaries = useCallback(async () => {
    if (!groupId || scanIds.length === 0 || problemTypes.length === 0) {
      return;
    }

    const flowKey = `${groupId}:${scanIds.join(",")}`;
    flowKeyRef.current = flowKey;

    try {
      const groupSummary: ProblemScanGroupSummaryResponse =
        await problemScanApi.getGroupSummary({ groupId });
      const summaries = groupSummary.summaries;

      if (flowKeyRef.current !== flowKey || !isMountedRef.current) return;

      if (groupSummary.status === "FAILED") {
        toastError(getFailToastMessage("UNKNOWN"));
        resetFlow();
        return;
      }

      const failed = summaries.find(isFailedSummary);
      if (failed) {
        toastError(getFailToastMessage(failed.failReason ?? "UNKNOWN"));
        resetFlow();
        return;
      }

      const isGroupReady =
        summaries.length === scanIds.length &&
        summaries.every((summary) => summary.status === "AI_DONE");

      if (!isGroupReady) {
        clearTimer();
        timerRef.current = setTimeout(() => {
          pollSummariesRef.current();
        }, POLL_INTERVAL_MS);
        return;
      }

      if (createdFlowRef.current === flowKey) return;
      createdFlowRef.current = flowKey;
      if (!isMountedRef.current) return;

      createGroupContext(summaries);
    } catch {
      clearTimer();
      timerRef.current = setTimeout(() => {
        pollSummariesRef.current();
      }, POLL_INTERVAL_MS);
    }
  }, [
    clearTimer,
    createGroupContext,
    problemTypes.length,
    resetFlow,
    groupId,
    scanIds,
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearTimer();
    };
  }, [clearTimer]);

  useEffect(() => {
    pollSummariesRef.current = () => {
      void pollSummaries();
    };
  }, [pollSummaries]);

  useEffect(() => {
    clearTimer();

    if (!groupId && scanIds.length === 0) {
      return;
    }

    void pollSummaries();
  }, [clearTimer, groupId, pollSummaries, scanIds]);

  const handleUploaded = useCallback(
    (res: ProblemScanGroupCreateResponse) => {
      if (res.scanIds.length === 0) return;

      createdFlowRef.current = "";
      goStep(1, {
        groupId: res.groupId ? String(res.groupId) : null,
        scanIds: res.scanIds.join(","),
        chapterId: null,
        unitId: null,
        typeIds: null,
      });
    },
    [goStep]
  );

  return {
    handleUploaded,
    isStep1Blocked: Boolean(groupId) || scanIds.length > 0,
  };
};

export default useStep1SummaryTransition;
