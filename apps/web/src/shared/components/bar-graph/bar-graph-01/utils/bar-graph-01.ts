export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const toCssVarName = (v: string) => {
  if (v.startsWith("var(") && v.endsWith(")")) return v.slice(4, -1).trim();
  return v;
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
};

export const computeMotionMs = (percent: number) => {
  const minMs = 450;
  const maxMs = 1400;
  const ms = minMs + percent * 10;
  return clamp(ms, minMs, maxMs);
};

export const computeVisualPercent = (params: {
  rawPercent: number;
  minPercent: number;
  maxPercent: number;
}) => {
  const { rawPercent, minPercent, maxPercent } = params;

  const min = clamp(minPercent, 0, 100);
  const max = clamp(maxPercent, 0, 100);
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);

  if (rawPercent === 0) return 0;
  return lo + (rawPercent / 100) * (hi - lo);
};
