import { useQuery } from "@tanstack/react-query";
import { storageKeys } from "@/shared/apis/storage/storage-keys";
import { storageApi } from "@/shared/apis/storage/storage-api";

export const usePresignedGetQuery = (params: {
  key: string;
  ttlSeconds?: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: storageKeys.presignedGet({
      key: params.key,
      ttlSeconds: params.ttlSeconds,
    }),
    queryFn: () =>
      storageApi.presignGet({ key: params.key, ttlSeconds: params.ttlSeconds }),
    enabled: params.enabled ?? true,
  });
};
