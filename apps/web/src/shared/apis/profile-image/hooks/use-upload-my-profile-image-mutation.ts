"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMyProfileImage } from "@/shared/apis/profile-image/profile-image-api";
import { userProfileImageQueryKey } from "@/shared/apis/profile-image/hooks/use-profile-image-query-key";
import { userKeys } from "@/shared/apis/user/user-keys";

export const useUploadMyProfileImageMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadMyProfileImage(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userProfileImageQueryKey });
      qc.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
