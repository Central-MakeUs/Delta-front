import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";
import { userKeys } from "@/shared/apis/user/user-keys";
import { toastSuccess } from "@/shared/components/toast/toast";

export const useKakaoLoginMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { code: string }) => authApi.kakaoLogin(params),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: userKeys.me() });
      toastSuccess("로그인에 성공했습니다!");
    },
  });
};
