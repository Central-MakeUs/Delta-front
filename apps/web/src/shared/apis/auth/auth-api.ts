import { instance, REFRESH_TOKEN_HEADER } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { tokenStorage } from "@/shared/apis/token-storage";

export type SocialLoginData = {
  email?: string | null;
  nickname?: string | null;
  isNewUser?: boolean;
};

export const authApi = {
  kakaoLogin: async (params: { code: string }) => {
    const res = await instance.post<ApiResponse<SocialLoginData>>(
      "/api/v1/auth/kakao",
      { code: params.code }
    );

    return unwrapApiResponse(res.data);
  },

  reissue: async () => {
    const { refreshToken } = tokenStorage.getTokens();
    if (!refreshToken) return;

    await instance.post("/api/v1/auth/reissue", null, {
      headers: {
        [REFRESH_TOKEN_HEADER]: refreshToken,
      },
    });
  },

  logout: async () => {
    await instance.post("/api/v1/auth/logout");
  },
};
