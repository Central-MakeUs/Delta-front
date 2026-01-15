import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/shared/apis/user/user-api";
import { tokenStorage } from "@/shared/apis/token-storage";

export const useWithdrawalMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => userApi.withdrawMyAccount(),
    onSuccess: () => {
      tokenStorage.clear();
      qc.clear();
    },
  });
};
