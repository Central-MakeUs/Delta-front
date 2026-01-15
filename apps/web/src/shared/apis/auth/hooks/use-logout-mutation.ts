import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";
import { tokenStorage } from "@/shared/apis/token-storage";
import { emitAuthLogout } from "@/shared/apis/auth/auth-events";

export const useLogoutMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      tokenStorage.clear();
      qc.clear();
      emitAuthLogout();
    },
  });
};
