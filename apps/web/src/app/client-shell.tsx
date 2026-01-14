"use client";

import type { ReactNode } from "react";
import QueryProvider from "@/shared/utils/query-provider";
import AppBarGate from "@/shared/components/app-bar/app-bar-gate";
import BottomNav from "@/shared/components/bottom-nav/bottom-nav";
import FabButton from "@/shared/components/button/fab-button/fab-button";
import Splash from "@/shared/components/splash/splash";

type ClientShellProps = {
  children: ReactNode;
};

const ClientShell = ({ children }: ClientShellProps) => {
  return (
    <QueryProvider>
      <Splash />
      <AppBarGate />
      {children}
      <BottomNav />
      <FabButton />
    </QueryProvider>
  );
};

export default ClientShell;
