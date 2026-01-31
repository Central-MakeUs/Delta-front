"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setParams } from "@/app/wrong/create/utils/url-params";

const readTypeIds = (sp: URLSearchParams) => {
  const raw = sp.get("typeIds") ?? null;
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

export const useTypeIdsParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);
  const urlTypeIds = useMemo(() => readTypeIds(params), [params]);

  const replaceTypeIds = useCallback(
    (nextTypeIds: string[]) => {
      const nextValue = nextTypeIds.length > 0 ? nextTypeIds.join(",") : null;
      const next = setParams(params, { typeIds: nextValue });
      const nextQuery = next.toString();
      if (nextQuery === spString) return;
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    },
    [params, pathname, router, spString]
  );

  return { urlTypeIds, replaceTypeIds, params, spString, pathname };
};
