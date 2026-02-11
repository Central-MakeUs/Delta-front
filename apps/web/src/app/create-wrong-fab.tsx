"use client";

import type { MouseEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FabButton from "@/shared/components/button/fab-button/fab-button";
import { ROUTES } from "@/shared/constants/routes";

type Props = {
  icon?: "file" | string;
  iconSize?: number;
  label?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const SHOW_ON_PATHS = [
  ROUTES.HOME,
  ROUTES.WRONG.ROOT,
  ROUTES.GRAPH.ROOT,
] as const;

const CreateWrongFab = ({ onClick }: Props) => {
  const pathname = usePathname();
  const sp = useSearchParams();
  const router = useRouter();

  if (!SHOW_ON_PATHS.includes(pathname as (typeof SHOW_ON_PATHS)[number]))
    return null;

  const handleFabClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const qs = sp.toString();
    const from = `${pathname}${qs ? `?${qs}` : ""}`;

    const nextParams = new URLSearchParams();
    nextParams.set("step", "1");
    nextParams.set("total", "4");
    nextParams.set("from", from);

    router.push(`${ROUTES.WRONG.CREATE}?${nextParams.toString()}`);
  };

  return <FabButton onFabClick={handleFabClick} />;
};

export default CreateWrongFab;
