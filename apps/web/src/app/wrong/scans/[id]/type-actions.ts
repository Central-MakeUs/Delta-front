"use client";

import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { normalize } from "@/app/wrong/create/utils/label-match";
import { reorder } from "@/app/wrong/scans/[id]/utils";

export const buildMovedCustomTypes = ({
  selectedTypes,
  customSelectedTypes,
  draggedTypeId,
  targetTypeId,
}: {
  selectedTypes: string[];
  customSelectedTypes: ProblemTypeItem[];
  draggedTypeId: string;
  targetTypeId: string;
}) => {
  const customTypesById = new Map(customSelectedTypes.map((type) => [type.id, type]));
  const currentCustomIds = customSelectedTypes.map((type) => type.id);
  const fromIndex = currentCustomIds.indexOf(draggedTypeId);
  const toIndex = currentCustomIds.indexOf(targetTypeId);

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return null;

  const nextCustomIds = reorder(currentCustomIds, fromIndex, toIndex);
  const regularSelectedTypes = selectedTypes.filter(
    (typeName) =>
      !customSelectedTypes.some(
        (customType) => normalize(customType.name) === normalize(typeName)
      )
  );

  return {
    nextCustomIds,
    nextSelectedTypes: [
      ...regularSelectedTypes,
      ...nextCustomIds
        .map((typeId) => customTypesById.get(typeId)?.name ?? null)
        .filter((typeName): typeName is string => Boolean(typeName)),
    ],
  };
};

export const submitDirectAddType = async ({
  draft,
  problemTypes,
  createType,
}: {
  draft: string;
  problemTypes: ProblemTypeItem[];
  createType: (name: string) => Promise<ProblemTypeItem>;
}) => {
  const nextTypeName = draft.trim();
  if (!nextTypeName) return null;

  const existingType = problemTypes.find(
    (type) => normalize(type.name) === normalize(nextTypeName)
  );
  return existingType ?? createType(nextTypeName);
};
