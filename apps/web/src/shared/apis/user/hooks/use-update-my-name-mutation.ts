import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userApi,
  type UserNameUpdateRequest,
} from "@/shared/apis/user/user-api";
import { userKeys } from "@/shared/apis/user/user-keys";

export const useUpdateMyProfileMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UserNameUpdateRequest) => userApi.updateMyName(body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
