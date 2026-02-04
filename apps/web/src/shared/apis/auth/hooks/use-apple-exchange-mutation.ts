import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";
import { userKeys } from "@/shared/apis/user/user-keys";

export const useAppleExchangeMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { loginKey: string }) =>
      authApi.appleExchange(params.loginKey),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
