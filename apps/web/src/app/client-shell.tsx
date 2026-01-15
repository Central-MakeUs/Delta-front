"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import QueryProvider from "@/shared/utils/query-provider";
import AppBarGate from "@/shared/components/app-bar/app-bar-gate";
import BottomNav from "@/shared/components/bottom-nav/bottom-nav";
import FabButton from "@/shared/components/button/fab-button/fab-button";
import Splash from "@/shared/components/splash/splash";

type ClientShellProps = {
  children: ReactNode;
};

const ClientShell = ({ children }: ClientShellProps) => {
  const [contentKey, setContentKey] = useState(0);

  return (
    <QueryProvider>
      <Splash onDone={() => setContentKey((k) => k + 1)} />
      <AppBarGate />
      <div key={contentKey}>{children}</div>
      <BottomNav />
      <FabButton />
    </QueryProvider>
  );
};

export default ClientShell;
