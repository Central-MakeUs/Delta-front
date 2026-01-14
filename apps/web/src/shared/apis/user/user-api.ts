import { instance } from "@/shared/apis/api";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";

export type UserMeData = {
  id: number;
  email?: string | null;
  nickname?: string | null;
};

type RawUserMeData = {
  id?: number;
  userId?: number;
  email?: string | null;
  nickname?: string | null;
};

const normalizeMe = (raw: RawUserMeData): UserMeData => {
  const id = raw.id ?? raw.userId ?? 0;
  return { id, email: raw.email ?? null, nickname: raw.nickname ?? null };
};

export const userApi = {
  getMyProfile: async () => {
    const res =
      await instance.get<ApiResponse<RawUserMeData>>("/api/v1/users/me");
    return normalizeMe(unwrapApiResponse(res.data));
  },

  withdrawMyAccount: async () => {
    await instance.post("/api/v1/users/withdrawal");
  },
};
