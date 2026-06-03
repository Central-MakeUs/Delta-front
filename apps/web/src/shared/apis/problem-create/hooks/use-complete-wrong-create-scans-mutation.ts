"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { toastError } from "@/shared/components/toast/toast";
import { ROUTES } from "@/shared/constants/routes";
import {
  readWrongCreateGroupContext,
  saveWrongCreateGroupContext,
} from "@/app/wrong/create/utils/group-context";
import {
  buildStoredProblemPayload,
  resolveFinalTypeIds,
  resolveItemFinalUnitId,
} from "@/app/wrong/scans/[id]/payload";

export const useCompleteWrongCreateScansMutation = () => {
  const router = useRouter();
  const createProblemMutation = useCreateBulkWrongAnswerCardsMutation();
  const createCustomTypeMutation = useCreateCustomTypeMutation();
  const { data: problemTypes = [] } = useProblemTypesQuery();

  return useMutation({
    mutationFn: async (groupId: string) => {
      const latestGroup = readWrongCreateGroupContext(groupId);
      const latestItems = latestGroup?.items ?? [];

      if (latestItems.length === 0) {
        throw new Error("등록할 문제가 없어요.");
      }

      const resolvedItems = await Promise.all(
        latestItems.map(async (item) => {
          const finalUnitId = resolveItemFinalUnitId(item);
          const finalTypeIds = await resolveFinalTypeIds({
            typeNames: item.typeNames,
            fallbackTypeIds: item.finalTypeIds,
            problemTypes,
            createType: (name) =>
              createCustomTypeMutation.mutateAsync({ name }),
          });

          if (!finalUnitId || finalTypeIds.length === 0) {
            throw new Error(
              "등록할 문제 정보가 부족해요. 문제 정보를 다시 확인해주세요."
            );
          }

          return {
            nextItem: {
              ...item,
              finalUnitId,
              finalTypeIds,
            },
            payloadItem: buildStoredProblemPayload(
              item,
              finalUnitId,
              finalTypeIds
            ),
          };
        })
      );

      // 그룹 컨텍스트 업데이트
      const nextGroup = {
        ...(latestGroup ?? {}),
        id: groupId,
        createdAt: latestGroup?.createdAt ?? Date.now(),
        items: resolvedItems.map(({ nextItem }) => nextItem),
      };

      saveWrongCreateGroupContext(nextGroup);

      // 벌크 생성 API 호출
      await createProblemMutation.mutateAsync(
        resolvedItems.map(({ payloadItem }) => payloadItem)
      );

      return groupId;
    },
    onSuccess: (groupId) => {
      router.push(
        `${ROUTES.WRONG.CREATE_DONE}?group=${encodeURIComponent(groupId)}`
      );
    },
    onError: (error) => {
      console.error("[wrong-create-scans] Complete failed", error);
      toastError(
        error instanceof Error ? error.message : "문제 등록에 실패했어요."
      );
    },
  });
};
