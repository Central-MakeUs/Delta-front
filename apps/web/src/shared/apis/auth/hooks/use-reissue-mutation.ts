import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/shared/apis/auth/auth-api";

export const useReissueMutation = () => {
  return useMutation({
    mutationFn: () => authApi.reissue(),
  });
};
