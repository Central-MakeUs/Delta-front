export const ERROR_CODES = {
  SYSTEM: {
    INTERNAL_SERVER_ERROR: "SYS_500",
  },
  RESOURCE: {
    NOT_FOUND: "RES_404",
  },
  REQUEST: {
    BAD_REQUEST: "REQ_001",
    METHOD_NOT_ALLOWED: "REQ_002",
  },
  AUTH: {
    AUTHENTICATION_FAILED: "AUTH_001",
    ACCESS_DENIED: "AUTH_002",
    TOKEN_REQUIRED: "AUTH_010",
  },
} as const;

export type ErrorCodeValue =
  | typeof ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR
  | typeof ERROR_CODES.RESOURCE.NOT_FOUND
  | typeof ERROR_CODES.REQUEST.BAD_REQUEST
  | typeof ERROR_CODES.REQUEST.METHOD_NOT_ALLOWED
  | typeof ERROR_CODES.AUTH.AUTHENTICATION_FAILED
  | typeof ERROR_CODES.AUTH.ACCESS_DENIED
  | typeof ERROR_CODES.AUTH.TOKEN_REQUIRED;

export const ERROR_CODE_INFO: Record<
  ErrorCodeValue,
  { status: number; message: string }
> = {
  [ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR]: {
    status: 500,
    message: "서버 오류가 발생했습니다.",
  },
  [ERROR_CODES.RESOURCE.NOT_FOUND]: {
    status: 404,
    message: "리소스를 찾을 수 없습니다.",
  },
  [ERROR_CODES.REQUEST.BAD_REQUEST]: {
    status: 400,
    message: "요청이 올바르지 않습니다.",
  },
  [ERROR_CODES.REQUEST.METHOD_NOT_ALLOWED]: {
    status: 405,
    message: "허용되지 않은 메서드입니다.",
  },
  [ERROR_CODES.AUTH.AUTHENTICATION_FAILED]: {
    status: 401,
    message: "인증에 실패했습니다.",
  },
  [ERROR_CODES.AUTH.ACCESS_DENIED]: {
    status: 403,
    message: "접근 권한이 없습니다.",
  },
  [ERROR_CODES.AUTH.TOKEN_REQUIRED]: {
    status: 401,
    message: "인증에 실패했습니다.",
  },
};
