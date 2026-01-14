import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";
import { tokenStorage } from "@/shared/apis/token-storage";

export const useLogoutMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      tokenStorage.clear();
      qc.clear();
    },
    onError: () => {
      tokenStorage.clear();
      qc.clear();
    },
  });
};
