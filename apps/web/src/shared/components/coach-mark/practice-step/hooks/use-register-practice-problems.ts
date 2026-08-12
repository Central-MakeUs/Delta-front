"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import sampleImage from "@/shared/assets/images/wrong-sample.png";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { getProblemTypes } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { resolveFinalTypeIds } from "@/app/wrong/scans/[id]/payload";
import { compressImageFile } from "@/shared/utils/compress-image";
import { toastError, toastSuccess } from "@/shared/components/toast/toast";
import type { ProblemScanSummaryResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import {
  COACH_MARK_PRACTICE,
  COACH_MARK_PRACTICE_SAMPLE,
} from "@/shared/components/coach-mark/constants/coach-mark";

const TOAST_BOTTOM_OFFSET_REM = 6.5;
const POLL_INTERVAL_MS = 1200;
const MAX_POLL_COUNT = 150;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const isFailedSummary = (summary: ProblemScanSummaryResponse) =>
  summary.status === "FAILED" || Boolean(summary.failReason);

const fetchSummaries = async (groupId: number | null, scanIds: number[]) => {
  if (groupId !== null) {
    const groupSummary = await problemScanApi.getGroupSummary({ groupId });
    if (groupSummary.status === "FAILED") {
      throw new Error("practice scan group failed");
    }
    return groupSummary.summaries;
  }

  return Promise.all(
    scanIds.map((scanId) => problemScanApi.getSummary({ scanId }))
  );
};

const waitForScansReady = async (
  groupId: number | null,
  scanIds: number[]
) => {
  for (let attempt = 0; attempt < MAX_POLL_COUNT; attempt += 1) {
    const summaries = await fetchSummaries(groupId, scanIds);

    const failed = summaries.find(isFailedSummary);
    if (failed) {
      throw new Error(failed.failReason ?? "practice scan failed");
    }

    const isReady =
      summaries.length === scanIds.length &&
      summaries.every((summary) => summary.status === "AI_DONE");

    if (isReady) return;

    await delay(POLL_INTERVAL_MS);
  }

  throw new Error("practice scan polling timed out");
};

const extFromType = (type: string) => {
  if (type === "image/webp") return "webp";
  if (type === "image/jpeg") return "jpg";
  return "png";
};

const buildSampleFiles = async (count: number) => {
  const res = await fetch(sampleImage.src);
  const blob = await res.blob();
  const original = new File(
    [blob],
    `${COACH_MARK_PRACTICE_SAMPLE.FILE_NAME_PREFIX}.png`,
    { type: blob.type || "image/png" }
  );

  const compressed = await compressImageFile(original, { skipBelowBytes: 0 });
  const ext = extFromType(compressed.type);

  return Array.from(
    { length: count },
    (_, index) =>
      new File(
        [compressed],
        `${COACH_MARK_PRACTICE_SAMPLE.FILE_NAME_PREFIX}-${index + 1}.${ext}`,
        { type: compressed.type }
      )
  );
};

export const useRegisterPracticeProblems = () => {
  const queryClient = useQueryClient();
  const bulkCreate = useCreateBulkWrongAnswerCardsMutation();
  const createCustomType = useCreateCustomTypeMutation();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const register = async () => {
      try {
        const [{ groupId, scanIds }, problemTypes] = await Promise.all([
          (async () => {
            const files = await buildSampleFiles(
              COACH_MARK_PRACTICE_SAMPLE.COUNT
            );
            return problemScanApi.createGroup({ files });
          })(),
          queryClient.fetchQuery({
            queryKey: problemTypeQueryKeys.list(),
            queryFn: getProblemTypes,
          }),
        ]);

        if (scanIds.length === 0) {
          throw new Error("practice scan ids missing");
        }

        await waitForScansReady(groupId ?? null, scanIds);

        const finalTypeIds = await resolveFinalTypeIds({
          typeNames: [...COACH_MARK_PRACTICE_SAMPLE.CHIPS],
          fallbackTypeIds: [...COACH_MARK_PRACTICE_SAMPLE.TYPE_IDS],
          problemTypes,
          createType: (name) => createCustomType.mutateAsync({ name }),
        });

        await bulkCreate.mutateAsync(
          scanIds.map((scanId) => ({
            scanId,
            finalUnitId: COACH_MARK_PRACTICE_SAMPLE.UNIT_ID,
            finalTypeIds,
            answerFormat: "CHOICE" as const,
            answerChoiceNo: COACH_MARK_PRACTICE_SAMPLE.ANSWER_CHOICE_NO,
          }))
        );

        toastSuccess(COACH_MARK_PRACTICE.TOAST, TOAST_BOTTOM_OFFSET_REM);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[coach-mark] practice problems register failed", e);
        }
        toastError(COACH_MARK_PRACTICE.TOAST_FAIL, TOAST_BOTTOM_OFFSET_REM);
      }
    };

    void register();
  }, [bulkCreate, createCustomType, queryClient]);
};

export default useRegisterPracticeProblems;
