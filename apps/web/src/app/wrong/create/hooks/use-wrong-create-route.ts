"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseProgress } from "@/shared/components/app-bar/utils/app-bar-routing";
import {
  clamp,
  readScanId,
  readStr,
} from "@/app/wrong/create/utils/search-params";

export const useWrongCreateRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { total, currentStep } = parseProgress(new URLSearchParams(spString));

  const scanId = useMemo(() => readScanId(params), [params]);
  const unitId = useMemo(() => readStr(params, "unitId"), [params]);
  const typeId = useMemo(() => readStr(params, "typeId"), [params]);

  const goStep = (nextStep: number, extra?: Record<string, string | null>) => {
    const safe = clamp(nextStep, 1, total);
    const nextParams = new URLSearchParams(spString);
    nextParams.set("step", String(safe));

    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v === null) nextParams.delete(k);
        else nextParams.set(k, v);
      });
    }

    const nextQuery = nextParams.toString();
    if (nextQuery === spString) return;
    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  };

  return {
    router,
    pathname,
    spString,
    params,
    total,
    currentStep,
    scanId,
    unitId,
    typeId,
    goStep,
  };
};
