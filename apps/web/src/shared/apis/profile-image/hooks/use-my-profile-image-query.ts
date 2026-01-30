"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProfileImage } from "@/shared/apis/profile-image/profile-image-api";
import { userProfileImageQueryKey } from "./use-profile-image-query-key";

export const useMyProfileImageQuery = () => {
  return useQuery({
    queryKey: userProfileImageQueryKey,
    queryFn: getMyProfileImage,
  });
};
