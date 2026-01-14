"use client";

import type { ReactNode } from "react";
import QueryProvider from "@/shared/utils/query-provider";
import AppBarGate from "@/shared/components/app-bar/app-bar-gate";
import BottomNav from "@/shared/components/bottom-nav/bottom-nav";
import FabButton from "@/shared/components/button/fab-button/fab-button";

type ClientShellProps = {
  children: ReactNode;
};

const ClientShell = ({ children }: ClientShellProps) => {
  return (
    <QueryProvider>
      <AppBarGate />
      {children}
      <BottomNav />
      <FabButton />
    </QueryProvider>
  );
};

export default ClientShell;
