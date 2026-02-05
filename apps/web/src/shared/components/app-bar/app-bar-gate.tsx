"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import AppBar from "@/shared/components/app-bar/app-bar";
import { useAppBar } from "@/shared/components/app-bar/hooks/use-app-bar";
import * as s from "@/shared/components/app-bar/app-bar.css";

export const AppBarGate = () => {
  const pathname = usePathname();
  const result = useAppBar();
  if (result.isHidden) return null;
  const isMy = pathname.startsWith(ROUTES.MY.ROOT);

  return (
    <AppBar
      {...result.props}
      className={clsx(result.props.className, isMy && s.fixedOnMy)}
    />
  );
};

export default AppBarGate;
