export const uniqById = <T extends { id: string }>(list: readonly T[]) => {
  const map = new Map<string, T>();
  for (const v of list) {
    map.set(v.id, v);
  }
  return Array.from(map.values());
};
