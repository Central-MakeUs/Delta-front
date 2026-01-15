import { useMutation } from "@tanstack/react-query";
import { storageApi } from "@/shared/apis/storage/storage-api";

export const useDeleteImageMutation = () => {
  return useMutation({
    mutationFn: (params: { key: string }) => storageApi.deleteImage(params),
  });
};
