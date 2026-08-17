import { ROUTES } from "@/shared/constants/routes";

export const WRONG_CREATE_TOTAL_STEPS = 4;

export const buildWrongCreateHref = (from: string) => {
  const params = new URLSearchParams();
  params.set("step", "1");
  params.set("total", String(WRONG_CREATE_TOTAL_STEPS));
  params.set("from", from);

  return `${ROUTES.WRONG.CREATE}?${params.toString()}`;
};
