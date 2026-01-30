import type { AxiosRequestConfig } from "axios";
import { instance } from "@/shared/apis/api";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import type { UserProfileImageResult } from "./profile-image-types";

export const getMyProfileImage = async () => {
  const res = await instance.get<ApiResponse<UserProfileImageResult>>(
    API_PATHS.USERS.PROFILE_IMAGE
  );
  return unwrapApiResponse(res.data);
};

export const uploadMyProfileImage = async (
  file: File,
  config?: AxiosRequestConfig
) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post<ApiResponse<UserProfileImageResult>>(
    API_PATHS.USERS.PROFILE_IMAGE,
    formData,
    config
  );

  return unwrapApiResponse(res.data);
};

export const deleteMyProfileImage = async () => {
  const res = await instance.delete<ApiResponse<null>>(
    API_PATHS.USERS.PROFILE_IMAGE
  );
  return unwrapApiResponse(res.data);
};
