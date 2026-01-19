import { normalize } from "@/app/wrong/create/utils/label-match";

export type TypeItem = { id: string; label: string };

export const normalizeTypeLabel = (v?: string | null) =>
  normalize(v).replace(/\s+/g, "");

export const toKebabId = (input: string) =>
  normalize(input)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const matchTypeByLabel = (
  items: readonly TypeItem[],
  name?: string | null
) => {
  const n = normalizeTypeLabel(name);
  if (!n) return null;

  return (
    items.find((v) => normalizeTypeLabel(v.label) === n) ??
    items.find(
      (v) =>
        n.includes(normalizeTypeLabel(v.label)) ||
        normalizeTypeLabel(v.label).includes(n)
    ) ??
    null
  );
};

export const computeTypeRecommendation = (
  items: readonly TypeItem[],
  aiTypeName?: string | null
) => {
  const n = normalize(aiTypeName);
  if (!n) return null as null | { selectedId: string; extraItem?: TypeItem };

  const hit = matchTypeByLabel(items, n);
  if (hit) return { selectedId: hit.id };

  const extraItem: TypeItem = { id: toKebabId(n), label: n };
  return { selectedId: extraItem.id, extraItem };
};

export const mergeExtraItem = (
  items: readonly TypeItem[],
  extra?: TypeItem
) => {
  if (!extra) return [...items];

  const exists = items.some(
    (v) => normalizeTypeLabel(v.label) === normalizeTypeLabel(extra.label)
  );
  return exists ? [...items] : [...items, extra];
};
