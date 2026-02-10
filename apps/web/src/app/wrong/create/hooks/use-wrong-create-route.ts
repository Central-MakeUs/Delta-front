"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseProgress } from "@/shared/components/app-bar/utils/app-bar-routing";
import {
  clamp,
  readScanId,
  readStr,
} from "@/app/wrong/create/utils/search-params";

const readTypeIds = (params: URLSearchParams) => {
  const raw = readStr(params, "typeIds");
  return raw;
};

export const useWrongCreateRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const { total, currentStep } = parseProgress(new URLSearchParams(spString));

  const scanId = useMemo(() => readScanId(params), [params]);
  const unitId = useMemo(() => readStr(params, "unitId"), [params]);
  const typeIds = useMemo(() => readTypeIds(params), [params]);

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

    // ✅ step1 재시작: Step2 추천이 새 summary 기준으로 다시 박히도록 URL 선택값 싹 제거
    if (safe === 1) {
      nextParams.delete("chapterId");
      nextParams.delete("unitId");
      nextParams.delete("typeIds");
    }

    const nextScanId = readScanId(nextParams);
    if (!nextScanId && safe > 1) return;

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
    typeIds,
    goStep,
  };
};

export default useWrongCreateRoute;
