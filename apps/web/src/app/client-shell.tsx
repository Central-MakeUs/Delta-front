"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AuthLogoutListener } from "@/shared/apis/auth/auth-logout-listener";
import QueryProvider from "@/shared/utils/query-provider";
import AppBarGate from "@/shared/components/app-bar/app-bar-gate";
import BottomNav from "@/shared/components/bottom-nav/bottom-nav";
import CreateWrongFab from "@/app/create-wrong-fab";
import Splash from "@/shared/components/splash/splash";
import QueryLoadingOverlay from "@/shared/components/loading/query-loading-overlay";

type ClientShellProps = {
  children: ReactNode;
};

const ClientShell = ({ children }: ClientShellProps) => {
  const [contentKey, setContentKey] = useState(0);

  return (
    <QueryProvider>
      <AuthLogoutListener />
      <Splash onDone={() => setContentKey((k) => k + 1)} />
      <QueryLoadingOverlay />
      <AppBarGate />
      <div key={contentKey}>{children}</div>
      <BottomNav />
      <CreateWrongFab />
    </QueryProvider>
  );
};

export default ClientShell;
