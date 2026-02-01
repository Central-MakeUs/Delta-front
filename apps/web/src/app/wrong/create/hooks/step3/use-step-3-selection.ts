"use client";

import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useSetProblemTypeActiveMutation } from "@/shared/apis/problem-type/hooks/use-set-problem-type-active-mutation";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import { useTypeIdsParam } from "@/app/wrong/create/hooks/step3/use-type-ids-param";
import { useOptimisticProblemTypes } from "@/app/wrong/create/hooks/step3/use-optimistic-problem-types";
import {
  useActiveTypeView,
  type ViewTypeItem,
} from "@/app/wrong/create/hooks/step3/use-active-type-view";
import { useSanitizedUrlTypeIds } from "@/app/wrong/create/hooks/step3/use-sanitized-url-type-ids";
import { useRecommendedTypes } from "@/app/wrong/create/hooks/step3/use-recommended-types";
import { useSelectedTypeIds } from "@/app/wrong/create/hooks/step3/use-selected-type-ids";
import { useTypeAddFlow } from "@/app/wrong/create/hooks/step3/use-type-add-flow";
import { useTypeMaintenance } from "@/app/wrong/create/hooks/step3/use-type-maintenance";

type UseStep3SelectionArgs = {
  scanId: number | string | null;
  onNextEnabledChange?: (enabled: boolean) => void;
};

export type UseStep3SelectionReturn = {
  isTypeLoading: boolean;
  viewItems: readonly ViewTypeItem[];
  viewSelectedTypeIds: readonly string[];
  suggestedNames: readonly string[];
  addSuggested: (name: string) => Promise<void>;
  isAdding: boolean;
  draft: string;
  setDraft: (v: string) => void;
  openAdd: () => void;
  closeAdd: () => void;
  commitAdd: () => Promise<void>;
  toggleType: (item: ViewTypeItem) => void;
  removeType: (typeId: string) => Promise<void>;
  restoreType: (typeId: string) => Promise<void>;
  renameType: (typeId: string, name: string) => Promise<void>;
  updateSortOrder: (typeId: string, sortOrder: number) => Promise<void>;
};

export const useStep3Selection = ({
  scanId,
  onNextEnabledChange,
}: UseStep3SelectionArgs): UseStep3SelectionReturn => {
  const { urlTypeIds, replaceTypeIds, params, spString } = useTypeIdsParam();
  const { data: allTypesRaw, isLoading: isTypeLoading } =
    useProblemTypesQuery();
  const allTypes = allTypesRaw ?? [];

  const optimistic = useOptimisticProblemTypes(allTypes);
  const view = useActiveTypeView(optimistic.mergedTypes);

  const sanitized = useSanitizedUrlTypeIds(
    urlTypeIds,
    view.activeIdSet,
    isTypeLoading,
    replaceTypeIds
  );

  const { data: summary } = useProblemScanSummaryQuery(scanId);
  const recommended = useRecommendedTypes(allTypes, summary);

  const selection = useSelectedTypeIds({
    sanitizedUrlTypeIds: sanitized.sanitizedUrlTypeIds,
    recommendedSelectedIds: recommended.selectedIds,
    isTypeLoading,
    params,
    spString,
    replaceTypeIds,
    onNextEnabledChange,
  });

  const createMut = useCreateCustomTypeMutation();
  const activeMut = useSetProblemTypeActiveMutation();
  const updateMut = useUpdateCustomTypeMutation();

  const setTypeActive = (typeId: string, active: boolean): Promise<void> => {
    return activeMut
      .mutateAsync({ typeId, body: { active } })
      .then(() => undefined);
  };

  const addFlow = useTypeAddFlow({
    allTypes,
    viewSelectedTypeIds: selection.viewSelectedTypeIds,
    commitSelected: selection.commitSelected,
    unmarkInactive: optimistic.unmarkInactive,
    createCustomType: (name) => createMut.mutateAsync({ name }),
    setTypeActive,
  });

  type UpdateTypeBody =
    | { name: string; sortOrder?: never }
    | { sortOrder: number; name?: never };

  const updateType = (typeId: string, body: UpdateTypeBody): Promise<void> => {
    return updateMut.mutateAsync({ typeId, body }).then(() => undefined);
  };

  const maintenance = useTypeMaintenance({
    allTypes: allTypes.map((t) => ({ id: t.id, sortOrder: t.sortOrder })),
    viewSelectedTypeIds: selection.viewSelectedTypeIds,
    commitSelected: selection.commitSelected,
    markInactive: optimistic.markInactive,
    unmarkInactive: optimistic.unmarkInactive,
    setSortOverride: optimistic.setSortOverride,
    restoreSortOverride: optimistic.restoreSortOverride,
    sortOverrides: optimistic.sortOverrides,
    setTypeActive,
    updateType,
  });

  return {
    isTypeLoading,
    viewItems: view.viewItems,
    viewSelectedTypeIds: selection.viewSelectedTypeIds,
    suggestedNames: recommended.unknownNames,
    addSuggested: addFlow.addSuggested,
    isAdding: addFlow.isAdding,
    draft: addFlow.draft,
    setDraft: addFlow.setDraft,
    openAdd: addFlow.openAdd,
    closeAdd: addFlow.closeAdd,
    commitAdd: addFlow.commitAdd,
    toggleType: selection.toggleType,
    removeType: maintenance.removeType,
    restoreType: maintenance.restoreType,
    renameType: maintenance.renameType,
    updateSortOrder: maintenance.updateSortOrder,
  };
};
