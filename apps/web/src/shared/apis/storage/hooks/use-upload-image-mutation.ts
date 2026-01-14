import { useMutation } from "@tanstack/react-query";
import { storageApi } from "@/shared/apis/storage/storage-api";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (params: { file: File; directory?: string }) =>
      storageApi.uploadImage(params),
  });
};
