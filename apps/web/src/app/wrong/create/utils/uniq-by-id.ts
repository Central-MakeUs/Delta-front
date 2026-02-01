export const uniqById = <T extends { id: string }>(list: readonly T[]) => {
  const map = new Map<string, T>();
  list.forEach((v) => map.set(v.id, v));
  return Array.from(map.values());
};
