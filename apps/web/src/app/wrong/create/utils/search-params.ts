export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const readScanId = (sp: URLSearchParams) => {
  const raw = sp.get("scanId");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

export const readStr = (sp: URLSearchParams, key: string) =>
  sp.get(key) ?? null;
