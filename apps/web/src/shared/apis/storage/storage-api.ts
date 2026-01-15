import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";

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
      API_PATHS.STORAGE.IMAGES,
      form,
      { params: { directory: params.directory } }
    );

    return unwrapApiResponse(res.data);
  },

  deleteImage: async (params: { key: string }) => {
    const res = await instance.delete<ApiResponse<null>>(
      API_PATHS.STORAGE.IMAGES,
      {
        params: { key: params.key },
      }
    );

    return unwrapApiResponse(res.data);
  },

  presignGet: async (params: { key: string; ttlSeconds?: number }) => {
    const res = await instance.get<ApiResponse<StoragePresignedGetData>>(
      API_PATHS.STORAGE.PRESIGNED_GET,
      { params }
    );

    return unwrapApiResponse(res.data);
  },
};
