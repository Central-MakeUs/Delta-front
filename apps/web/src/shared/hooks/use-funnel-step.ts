"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

type UseFunnelStepParams = {
  total: number;
  paramKey?: string;
  initialStep?: number;
};

export const useFunnelStep = ({
  total,
  paramKey = "step",
  initialStep = 1,
}: UseFunnelStepParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const step = useMemo(() => {
    const raw = Number(searchParams.get(paramKey) ?? initialStep);
    return clamp(Number.isNaN(raw) ? initialStep : raw, 1, total);
  }, [initialStep, paramKey, searchParams, total]);

  const buildUrl = useCallback(
    (nextStep: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, String(nextStep));
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [paramKey, pathname, searchParams]
  );

  const setStep = useCallback(
    (nextStep: number) => {
      const safe = clamp(nextStep, 1, total);
      router.replace(buildUrl(safe), { scroll: false });
    },
    [buildUrl, router, total]
  );

  const next = useCallback(() => setStep(step + 1), [setStep, step]);
  const prev = useCallback(() => setStep(step - 1), [setStep, step]);

  return { step, setStep, next, prev };
};
