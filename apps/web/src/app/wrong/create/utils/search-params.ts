export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const readScanIds = (sp: URLSearchParams) => {
  const raw = sp.get("scanIds");
  if (!raw) return [];

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value !== "")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
};

export const readScanId = (sp: URLSearchParams) => {
  const scanIds = readScanIds(sp);
  if (scanIds.length > 0) return scanIds[0] ?? null;

  const raw = sp.get("scanId");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

export const readStr = (sp: URLSearchParams, key: string) =>
  sp.get(key) ?? null;
