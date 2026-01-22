export const setParams = (
  base: URLSearchParams,
  patch: Record<string, string | null>
) => {
  const next = new URLSearchParams(base.toString());

  Object.entries(patch).forEach(([k, v]) => {
    if (v === null) next.delete(k);
    else next.set(k, v);
  });

  return next;
};
