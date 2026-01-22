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
  PROBLEM_SCANS: {
    ROOT: "${API_V1}/problem-scans",
    DETAIL: (scanId: number | string) => `${API_V1}/problem-scans/${scanId}`,
    SUMMARY: (scanId: number | string) =>
      `${API_V1}/problem-scans/${scanId}/summary`,
  },
  PROBLEM_CREATE: {
    ROOT: `${API_V1}/problems`,
  },
  PROBLEM_STATS: {
    UNITS: `${API_V1}/problems/stats/units`,
    TYPES: `${API_V1}/problems/stats/types`,
  },
} as const;
