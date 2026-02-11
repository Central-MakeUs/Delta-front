const API_V1 = "/api/v1" as const;

export const API_PATHS = {
  AUTH: {
    KAKAO_LOGIN: `${API_V1}/auth/kakao`,
    APPLE_LOGIN: `${API_V1}/auth/apple`,
    APPLE_EXCHANGE: `${API_V1}/auth/apple/exchange`,
    REISSUE: `${API_V1}/auth/reissue`,
    LOGOUT: `${API_V1}/auth/logout`,
  },
  USERS: {
    ME: `${API_V1}/users/me`,
    ONBOARDING: `${API_V1}/users/me/onboarding`,
    WITHDRAWAL: `${API_V1}/users/withdrawal`,
    PROFILE_IMAGE: "/api/v1/users/me/profile-image",
  },
  STORAGE: {
    IMAGES: `${API_V1}/storage/images`,
    PRESIGNED_GET: `${API_V1}/storage/images/presigned-get`,
  },
  PROBLEM_SCANS: {
    ROOT: `${API_V1}/problem-scans`,
    DETAIL: (scanId: number | string) => `${API_V1}/problem-scans/${scanId}`,
    SUMMARY: (scanId: number | string) =>
      `${API_V1}/problem-scans/${scanId}/summary`,
  },
  PROBLEM_CREATE: {
    ROOT: `${API_V1}/problems`,
  },
  PROBLEM_LIST: {
    SCROLL: `${API_V1}/problems/scroll`,
  },
  PROBLEM_TYPES: {
    ROOT: `${API_V1}/problem-types`,
    DETAIL: (typeId: string) => `${API_V1}/problem-types/${typeId}`,
    ACTIVE: (typeId: string) => `${API_V1}/problem-types/${typeId}/activation`,
  },
  PROBLEM_STATS: {
    UNITS: `${API_V1}/problems/stats/units`,
    TYPES: `${API_V1}/problems/stats/types`,
    MONTHLY: `${API_V1}/problems/stats/monthly`,
  },
  PROBLEM_DETAIL: {
    DETAIL: (problemId: number | string) => `${API_V1}/problems/${problemId}`,
    COMPLETE: (problemId: number | string) =>
      `${API_V1}/problems/${problemId}/complete`,
  },
  PRO: {
    CHECKOUT_CLICK: `${API_V1}/pro/checkout-click`,
  },
} as const;
