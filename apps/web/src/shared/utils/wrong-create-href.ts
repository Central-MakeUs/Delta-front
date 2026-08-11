import { ROUTES } from "@/shared/constants/routes";

export const WRONG_CREATE_TOTAL_STEPS = 4;

/**
 * 문제 등록 플로우 진입 URL.
 * `from` 은 플로우를 빠져나갈 때 돌아갈 경로다.
 */
export const buildWrongCreateHref = (from: string) => {
  const params = new URLSearchParams();
  params.set("step", "1");
  params.set("total", String(WRONG_CREATE_TOTAL_STEPS));
  params.set("from", from);

  return `${ROUTES.WRONG.CREATE}?${params.toString()}`;
};
