import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";

export type StorageUploadData = {
  storageKey: string;
  viewUrl: string;
  contentType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
};

export type StoragePresignedGetData = {
  url: string;
  expiresInSeconds: number;
};

export const storageApi = {
  uploadImage: async (params: { file: File; directory?: string }) => {
    const form = new FormData();
    form.append("file", params.file);

    const res = await instance.post<ApiResponse<StorageUploadData>>(
      "/api/v1/storage/images",
      form,
      {
        params: { directory: params.directory },
      }
    );

    return unwrapApiResponse(res.data);
  },

  deleteImage: async (params: { key: string }) => {
    const res = await instance.delete<ApiResponse<null>>(
      "/api/v1/storage/images",
      {
        params: { key: params.key },
      }
    );

    return unwrapApiResponse(res.data);
  },

  presignGet: async (params: { key: string; ttlSeconds?: number }) => {
    const res = await instance.get<ApiResponse<StoragePresignedGetData>>(
      "/api/v1/storage/images/presigned-get",
      { params }
    );

    return unwrapApiResponse(res.data);
  },
};
