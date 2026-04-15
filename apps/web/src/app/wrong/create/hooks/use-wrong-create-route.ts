"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  clamp,
  readScanIds,
  readStr,
} from "@/app/wrong/create/utils/search-params";

export const useWrongCreateRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const scanIds = useMemo(() => readScanIds(params), [params]);
  const groupId = useMemo(() => readStr(params, "groupId"), [params]);

  const goStep = (nextStep: number, extra?: Record<string, string | null>) => {
    const safe = clamp(nextStep, 1, Number.MAX_SAFE_INTEGER);
    const nextParams = new URLSearchParams(spString);
    nextParams.set("step", String(safe));

    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v === null) nextParams.delete(k);
        else nextParams.set(k, v);
      });
    }

    if (safe === 1) {
      nextParams.delete("chapterId");
      nextParams.delete("unitId");
      nextParams.delete("typeIds");
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
    scanIds,
    groupId,
    goStep,
  };
};

export default useWrongCreateRoute;
