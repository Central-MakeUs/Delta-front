export const WRONG_PREFIX = "wrong";
export const MY_PREFIX = "my";
export const GRAPH_PREFIX = "graph" as const;

export const GRAPH_TABS = {
  WRONG: "wrong",
  UNIT: "unit",
} as const;

export type GraphTab = (typeof GRAPH_TABS)[keyof typeof GRAPH_TABS];

export type ErrorType = "401" | "404" | "500";

export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    SIGNUP_INFO: "/login/info",
    KAKAO_CALLBACK: "/oauth/kakao/callback",
    APPLE_CALLBACK: "/oauth/apple/callback",
  },
  ERROR: {
    ROOT: "/error",
    NOT_FOUND: "/error?type=404",
    INTERNAL_SERVER_ERROR: "/error?type=500",
  },
  WRONG: {
    ROOT: `/${WRONG_PREFIX}`,
    CREATE: `/${WRONG_PREFIX}/create`,
    CREATE_DONE: `/${WRONG_PREFIX}/create/done`,
    DETAIL: (id: string | number) => `/${WRONG_PREFIX}/${id}`,
    EDIT: (id: string | number) => `/${WRONG_PREFIX}/${id}/edit`,
  },
  MY: {
    ROOT: `/${MY_PREFIX}`,
    EDIT: `/${MY_PREFIX}/edit`,
  },
  GRAPH: {
    ROOT: `/${GRAPH_PREFIX}`,
    tab: (tab: GraphTab) => `/${GRAPH_PREFIX}?tab=${tab}`,
  },
  PRO: {
    ROOT: `/pro`,
  },
} as const;

export type RouteValue =
  | typeof ROUTES.HOME
  | typeof ROUTES.AUTH.LOGIN
  | typeof ROUTES.AUTH.SIGNUP_INFO
  | typeof ROUTES.AUTH.KAKAO_CALLBACK
  | typeof ROUTES.AUTH.APPLE_CALLBACK
  | typeof ROUTES.ERROR
  | typeof ROUTES.ERROR.NOT_FOUND
  | typeof ROUTES.ERROR.INTERNAL_SERVER_ERROR
  | typeof ROUTES.WRONG.ROOT
  | typeof ROUTES.WRONG.CREATE
  | typeof ROUTES.WRONG.CREATE_DONE
  | typeof ROUTES.MY.ROOT
  | typeof ROUTES.MY.EDIT
  | typeof ROUTES.GRAPH.ROOT
  | typeof ROUTES.PRO.ROOT;
