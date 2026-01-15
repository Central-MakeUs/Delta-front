export const storageKeys = {
  all: ["storage"] as const,

  presigned: () => [...storageKeys.all, "presigned-get"] as const,
  presignedGet: (params: { key: string; ttlSeconds?: number }) =>
    [...storageKeys.presigned(), params] as const,
};
