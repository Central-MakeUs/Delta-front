const API_V1 = "/api/v1" as const;

export const API_PATHS = {
  AUTH: {
    KAKAO_LOGIN: `${API_V1}/auth/kakao`,
    REISSUE: `${API_V1}/auth/reissue`,
    LOGOUT: `${API_V1}/auth/logout`,
  },
  USERS: {
    ME: `${API_V1}/users/me`,
    WITHDRAWAL: `${API_V1}/users/withdrawal`,
  },
  STORAGE: {
    IMAGES: `${API_V1}/storage/images`,
    PRESIGNED_GET: `${API_V1}/storage/images/presigned-get`,
  },
} as const;
