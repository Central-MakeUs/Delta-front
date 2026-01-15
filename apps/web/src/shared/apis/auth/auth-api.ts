import { instance, REFRESH_TOKEN_HEADER } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { tokenStorage } from "@/shared/apis/token-storage";
import { API_PATHS } from "@/shared/apis/constants/api-paths";

export type SocialLoginData = {
  email?: string | null;
  nickname?: string | null;
  isNewUser?: boolean;
};

export const authApi = {
  kakaoLogin: async (params: { code: string }) => {
    const res = await instance.post<ApiResponse<SocialLoginData>>(
      API_PATHS.AUTH.KAKAO_LOGIN,
      { code: params.code }
    );

    return unwrapApiResponse(res.data);
  },

  reissue: async () => {
    const { refreshToken } = tokenStorage.getTokens();
    if (!refreshToken) return;

    await instance.post(API_PATHS.AUTH.REISSUE, null, {
      headers: { [REFRESH_TOKEN_HEADER]: refreshToken },
    });
  },

  logout: async () => {
    await instance.post(API_PATHS.AUTH.LOGOUT);
  },
};
