export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const parsePositiveInt = (value: string): number | null => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};

export const readScanIds = (sp: URLSearchParams) => {
  const raw = sp.get("scanIds");
  if (!raw) return [];

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value !== "")
    .map(parsePositiveInt)
    .filter((value): value is number => value !== null);
};

export const readScanId = (sp: URLSearchParams) => {
  const scanIds = readScanIds(sp);
  if (scanIds.length > 0) return scanIds[0] ?? null;

  const raw = sp.get("scanId");
  if (!raw) return null;
  return parsePositiveInt(raw);
};

export const readStr = (sp: URLSearchParams, key: string) =>
  sp.get(key) ?? null;
