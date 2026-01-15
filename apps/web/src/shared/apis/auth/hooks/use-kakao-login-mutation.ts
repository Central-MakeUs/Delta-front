import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";
import { userKeys } from "@/shared/apis/user/user-keys";

export const useKakaoLoginMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { code: string }) => authApi.kakaoLogin(params),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
