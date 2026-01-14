import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/shared/apis/user/user-keys";
import { userApi } from "@/shared/apis/user/user-api";

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.getMyProfile,
    staleTime: 60_000,
  });
};
