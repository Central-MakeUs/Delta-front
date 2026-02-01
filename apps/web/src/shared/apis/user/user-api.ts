import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { API_PATHS } from "@/shared/apis/constants/api-paths";

export type UserMeData = {
  id: number;
  email?: string | null;
  nickname?: string | null;
  oauthProvider?: string | null;
};

type RawUserMeData = {
  id?: number;
  userId?: number;
  email?: string | null;
  nickname?: string | null;
  oauthProvider?: string | null;
};

export type UserNameUpdateRequest = {
  nickname: string;
};

const normalizeMe = (raw: RawUserMeData): UserMeData => {
  const id = raw.id ?? raw.userId ?? 0;
  if (id === 0) console.warn("[userApi] User ID is missing from response");
  return {
    id,
    email: raw.email ?? null,
    nickname: raw.nickname ?? null,
    oauthProvider: raw.oauthProvider ?? null,
  };
};

export type OnboardingParams = {
  nickname: string;
  birthDate: string; // YYYY-MM-DD
  termsAgreed: boolean;
};

export const userApi = {
  getMyProfile: async () => {
    const res = await instance.get<ApiResponse<RawUserMeData>>(
      API_PATHS.USERS.ME
    );
    return normalizeMe(unwrapApiResponse(res.data));
  },

  updateMyName: async (body: UserNameUpdateRequest) => {
    await instance.patch(API_PATHS.USERS.ME, body);
  },

  /** 추가 정보 입력 후 회원가입 완료 (ONBOARDING_REQUIRED → ACTIVE) */
  onboarding: async (params: OnboardingParams) => {
    const res = await instance.post<ApiResponse<unknown>>(
      API_PATHS.USERS.ONBOARDING,
      {
        nickname: params.nickname.trim(),
        birthDate: params.birthDate,
        termsAgreed: params.termsAgreed === true,
      }
    );
    return unwrapApiResponse(res.data);
  },

  withdrawMyAccount: async () => {
    await instance.post(API_PATHS.USERS.WITHDRAWAL);
  },
};
