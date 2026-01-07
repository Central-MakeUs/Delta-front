export const AUTH_PREFIX = "auth";
export const WRONG_PREFIX = "wrong";
export const MY_PREFIX = "my";
export const GRAPH_PREFIX = "graph" as const;
export const GRAPH_TABS = {
  WRONG: "wrong",
  UNIT: "unit",
} as const;

export type GraphTab = (typeof GRAPH_TABS)[keyof typeof GRAPH_TABS];

export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: `/${AUTH_PREFIX}/login`,
  },

  WRONG: {
    ROOT: `/${WRONG_PREFIX}`,
    CREATE: `/${WRONG_PREFIX}/create`, // 오답 등록
    CREATE_DONE: `/${WRONG_PREFIX}/create/done`, // 오답 등록 완료
    DETAIL: (id: string | number = "[id]") => `/${WRONG_PREFIX}/${id}`, // 오답 상세
    EDIT: (id: string | number = "[id]") => `/${WRONG_PREFIX}/${id}/edit`, // 오답 수정
  },

  MY: {
    ROOT: `/${MY_PREFIX}`,
  },

  GRAPH: {
    ROOT: `/${GRAPH_PREFIX}`,
    tab: (tab: GraphTab) => `/${GRAPH_PREFIX}?tab=${tab}`,
  },
} as const;

export type RouteValue =
  | typeof ROUTES.HOME
  | typeof ROUTES.AUTH.LOGIN
  | typeof ROUTES.WRONG.ROOT
  | typeof ROUTES.WRONG.CREATE
  | typeof ROUTES.WRONG.CREATE_DONE
  | typeof ROUTES.MY.ROOT
  | typeof ROUTES.GRAPH.ROOT;
