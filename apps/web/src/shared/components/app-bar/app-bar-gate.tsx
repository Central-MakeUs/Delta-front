"use client";

import AppBar from "@/shared/components/app-bar/app-bar";
import { useAppBar } from "@/shared/components/app-bar/hooks/use-app-bar";

export const AppBarGate = () => {
  const result = useAppBar();
  if (result.isHidden) return null;
  return <AppBar {...result.props} />;
};

export default AppBarGate;
