import { ROUTES } from "@/shared/constants/routes";

const clampInt = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(Math.trunc(value), min), max);
};

export const shouldHideAppBar = (pathname: string) => {
  if (pathname === ROUTES.AUTH.LOGIN) return true;
  if (pathname === ROUTES.WRONG.CREATE_DONE) return true;
  if (pathname.startsWith(ROUTES.GRAPH.ROOT)) return true;
  return false;
};

export const parseProgress = (searchParams: URLSearchParams) => {
  const stepRaw = Number(searchParams.get("step") ?? "1");
  const totalRaw = Number(searchParams.get("total") ?? "4");

  const total = clampInt(totalRaw, 1, 20);
  const currentStep = clampInt(stepRaw, 1, total);

  return { total, currentStep };
};

export const getWrongRouteMatch = (pathname: string) => {
  // /wrong/create* 는 상세/수정 매치에서 제외
  if (pathname.startsWith(ROUTES.WRONG.CREATE))
    return { type: "create" as const };

  if (!pathname.startsWith(ROUTES.WRONG.ROOT)) return { type: "none" as const };

  const segments = pathname.split("/").filter(Boolean); // ["wrong", ...]
  if (segments.length === 1) return { type: "list" as const };

  // /wrong/[id]
  if (segments.length === 2) {
    return { type: "detail" as const, id: segments[1]! };
  }

  // /wrong/[id]/edit
  if (segments.length === 3 && segments[2] === "edit") {
    return { type: "edit" as const, id: segments[1]! };
  }

  return { type: "none" as const };
};
