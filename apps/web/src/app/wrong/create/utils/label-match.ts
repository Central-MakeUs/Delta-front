export const normalize = (v?: string | null) => (v ?? "").trim();

export const matchByLabel = <T extends { label: string }>(
  items: readonly T[],
  name?: string | null
) => {
  const n = normalize(name);
  if (!n) return null;

  return (
    items.find((v) => v.label === n) ??
    items.find((v) => n.includes(v.label) || v.label.includes(n)) ??
    null
  );
};
