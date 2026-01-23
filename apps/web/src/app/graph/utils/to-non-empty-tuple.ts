export const toNonEmptyTuple = <T>(
  arr: readonly T[]
): readonly [T, ...T[]] | null => {
  if (arr.length === 0) return null;
  return arr as readonly [T, ...T[]];
};
