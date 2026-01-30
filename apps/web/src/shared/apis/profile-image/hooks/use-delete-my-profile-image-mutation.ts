"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyProfileImage } from "@/shared/apis/profile-image/profile-image-api";
import { userProfileImageQueryKey } from "@/shared/apis/profile-image/hooks/use-profile-image-query-key";

export const useDeleteMyProfileImageMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMyProfileImage(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userProfileImageQueryKey });
    },
  });
};
